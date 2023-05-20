import { useComponentValue } from '@latticexyz/react';
import { hexToArray } from '@latticexyz/utils';
import { useMUD } from './MUDContext';
import { terrainTypes, TerrainType } from './terrainTypes';
import { PlayerIcon } from './PlayerIcon';
import { useKeyboardMovement } from './useKeyboardMovement';

export const Grid = () => {
  const mud = useMUD();

  const {
    components: { Map, PositionComponent, PlayerComponent },
    network: { singletonEntity, playerEntity },
    systemCalls: { spawn },
  } = mud;

  useKeyboardMovement();

  const playerPosition = useComponentValue(PositionComponent, playerEntity);
  const canJoinGame =
    useComponentValue(PlayerComponent, playerEntity)?.value !== true;
  const map = useComponentValue(Map, singletonEntity);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { width, height, terrain } = map!;
  const rows = new Array(height).fill(0).map((_, i) => i);
  const columns = new Array(width).fill(0).map((_, i) => i);

  const terrainValues = Array.from(hexToArray(terrain)).map((value, index) => {
    return {
      x: index % width,
      y: Math.floor(index / width),
      value,
      type: value in TerrainType ? terrainTypes[value as TerrainType] : null,
    };
  });

  return (
    <div className="inline-grid p-2 bg-lime-500 relative overflow-hidden">
      {rows.map((y) =>
        columns.map((x) => {
          const terrain = terrainValues.find(
            (t) => t.x === x && t.y === y
          )?.type;
          const hasPlayer = playerPosition?.x === x && playerPosition?.y === y;
          return (
            <div
              key={`${x},${y}`}
              className={`
                w-8 h-8 flex items-center justify-center
                ${canJoinGame ? 'cursor-pointer hover:ring' : null}
              `}
              style={{
                gridColumn: x + 1,
                gridRow: y + 1,
              }}
              onClick={(event) => {
                event.preventDefault();
                if (canJoinGame) {
                  spawn(x, y);
                }
              }}
            >
              <div className="flex flex-wrap gap-1 items-center justify-center relative">
                {terrain ? (
                  <div className="absolute inset-0 flex items-center justify-center text-3xl pointer-events-none">
                    {terrain.emoji}
                  </div>
                ) : null}
                <div className="relative">
                  {hasPlayer ? <PlayerIcon /> : null}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
