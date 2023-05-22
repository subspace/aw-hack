import { SyncState } from "@latticexyz/network";
import { useComponentValue } from "@latticexyz/react";

import { useMUD } from "./MUDContext";
import { Grid } from "./Grid";
import { Greeting } from "./Greeting";
import { MusicButton } from "./MusicButton";
import { PlayerProfile } from "./PlayerProfile";
import useModal from "./hooks/useModal";
import Inventory from "./Inventory";

export const App = () => {
  const {
    components: { Position, LoadingState },
    network: { singletonEntity, playerEntity },
    systemCalls: { spawn, isObstructed },
  } = useMUD();

  const loadingState = useComponentValue(LoadingState, singletonEntity, {
    state: SyncState.CONNECTING,
    msg: "Connecting",
    percentage: 0,
  });

  const { isOpen, toggle } = useModal();

  const joinRandomCoordinates = () => {
    let x, y;

    do {
      x = Math.floor(Math.random() * 32);
      y = Math.floor(Math.random() * 32);
    } while (isObstructed(x, y));

    spawn(x, y);
  };

  const playerPosition = useComponentValue(Position, playerEntity);

  return (
    <div className="bg-black w-screen h-screen flex items-center justify-center relative overflow-hidden">
      <div className="flex flex-col gap-10 h-full overflow-auto">
        {loadingState.state !== SyncState.LIVE ? (
          <div>
            {loadingState.msg} ({Math.floor(loadingState.percentage)}%)
          </div>
        ) : (
          <div className="overflow-auto max-h-full">
            {playerPosition ? (
              <Grid />
            ) : (
              <Greeting onJoin={joinRandomCoordinates} />
            )}
          </div>
        )}
        <div className="absolute top-0 right-0 m-4">
          <MusicButton />
        </div>

        {playerPosition && (
          <div className="absolute top-0 left-0 m-4">
            <div className="flex flex-col gap-4">
              <PlayerProfile />
              <button
                className="bg-white color-black px-2 py-1"
                onClick={toggle}
              >
                Open Inventory
              </button>
            </div>
          </div>
        )}
      </div>
      <Inventory isOpen={isOpen} toggle={toggle} />
    </div>
  );
};
