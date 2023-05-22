import { SyncState } from '@latticexyz/network';
import { useComponentValue } from '@latticexyz/react';

import { useMUD } from './MUDContext';
import { Grid } from './Grid';
import { MusicButton } from './MusicButton';

export const App = () => {
  const {
    components,
    network: { singletonEntity },
  } = useMUD();

  const loadingState = useComponentValue(
    components.LoadingState,
    singletonEntity,
    {
      state: SyncState.CONNECTING,
      msg: 'Connecting',
      percentage: 0,
    }
  );

  return (
    <div className="bg-black w-screen h-screen flex items-center justify-center relative overflow-hidden">
      <div className="flex flex-col gap-10 h-full overflow-auto">
        {loadingState.state !== SyncState.LIVE ? (
          <div>
            {loadingState.msg} ({Math.floor(loadingState.percentage)}%)
          </div>
        ) : (
          <div className="overflow-auto max-h-full">
            <Grid />
          </div>
        )}
        <div className="absolute top-0 right-0 m-4">
          <MusicButton />
        </div>
      </div>
    </div>
  );
};
