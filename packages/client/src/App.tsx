import { SyncState } from "@latticexyz/network";
import { useComponentValue } from "@latticexyz/react";
import useSound from "use-sound";

import { useMUD } from "./MUDContext";
import { Grid } from "./Grid";

// music
import adventureStartSong from "./assets/music/adventureStarts.ogg";
import { useState } from "react";
import StopIcon from "./icons/StopIcon";
import PlayIcon from "./icons/PlayIcon";
import { Village } from "./Village";

export const App = () => {
  const {
    components,
    network: { singletonEntity },
  } = useMUD();

  const [playMusic, setPlayMusic] = useState(false);
  const [play, { stop }] = useSound(adventureStartSong, {
    interrupt: true,
    volume: 0.5,
    loop: true,
    autoplay: true,
    onplay: () => setPlayMusic(true),
    onstop: () => setPlayMusic(false),
    onpause: () => setPlayMusic(false),
  });

  const loadingState = useComponentValue(
    components.LoadingState,
    singletonEntity,
    {
      state: SyncState.CONNECTING,
      msg: "Connecting",
      percentage: 0,
    }
  );

  const handleMusic = () => {
    if (playMusic) {
      stop();
    } else {
      play();
    }
  };

  return (
    <div className=" bg-black w-screen h-screen flex items-center justify-center ">
      <div className="flex flex-col gap-10">
        {loadingState.state !== SyncState.LIVE ? (
          <div>
            {loadingState.msg} ({Math.floor(loadingState.percentage)}%)
          </div>
        ) : (
          <div>
            {/* <Grid /> */}
            <Village />
          </div>
        )}
        <div>
          <button
            className="bg-white color-black px-2 py-2 rounded-full"
            onClick={handleMusic}
          >
            {playMusic ? (
              <span className="w-4 h-4">
                <StopIcon />
              </span>
            ) : (
              <span className="w-4 h-4">
                <PlayIcon />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
