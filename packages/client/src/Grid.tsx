import { useMUD } from './MUDContext';
import { useComponentValue } from '@latticexyz/react';
import { terrainTypes, TerrainType } from './terrainTypes';
import { hexToArray } from '@latticexyz/utils';

export const Grid = () => {
  const {
    components: { Map },
    network: { singletonEntity },
  } = useMUD();

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
          return (
            <div
              key={`${x},${y}`}
              className="w-8 h-8 flex items-center justify-center"
              style={{
                gridColumn: x + 1,
                gridRow: y + 1,
              }}
              onClick={() => {
                console.log('click', { x, y });
              }}
            >
              <div className="flex flex-wrap gap-1 items-center justify-center relative">
                {terrain ? (
                  <div className="absolute inset-0 flex items-center justify-center text-3xl pointer-events-none">
                    {terrain.emoji}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
