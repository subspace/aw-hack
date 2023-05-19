import { SyncState } from '@latticexyz/network';
import { useComponentValue } from '@latticexyz/react';
import { useMUD } from './MUDContext';
import { Grid } from './Grid';

export const App = () => {
  const {
    components: { LoadingState },
    network: { singletonEntity },
  } = useMUD();

  const loadingState = useComponentValue(LoadingState, singletonEntity, {
    state: SyncState.CONNECTING,
    msg: 'Connecting',
    percentage: 0,
  });

  return (
    <div>
      {loadingState.state !== SyncState.LIVE ? (
        <div>
          {loadingState.msg} ({Math.floor(loadingState.percentage)}%)
        </div>
      ) : (
        <Grid />
      )}
    </div>
  );
};
