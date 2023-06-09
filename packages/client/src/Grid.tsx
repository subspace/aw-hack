import { useComponentValue, useEntityQuery } from '@latticexyz/react';
import { hexToArray } from '@latticexyz/utils';
import { Has, getComponentValueStrict } from '@latticexyz/recs';
import { useMUD } from './MUDContext';
import { terrainTypes, TerrainType } from './terrainTypes';
import { PlayerIcon } from './PlayerIcon';
import { useKeyboardMovement } from './useKeyboardMovement';

export const Grid = () => {
  const mud = useMUD();

  const {
    components: { Map, Position, Player },
    network: { singletonEntity, playerEntity },
  } = mud;

  useKeyboardMovement();

  const players = useEntityQuery([Has(Player), Has(Position)]).map((entity) => {
    const position = getComponentValueStrict(Position, entity);
    return {
      entity,
      x: position.x,
      y: position.y,
      playerIcon:
        entity === playerEntity ? <PlayerIcon isMyPlayer /> : <PlayerIcon />,
    };
  });

  const canJoinGame = useComponentValue(Player, playerEntity)?.value !== true;
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
    <div className="inline-grid p-2 bg-[#6fa752] relative overflow-hidden">
      {rows.map((y) =>
        columns.map((x) => {
          const terrain = terrainValues.find(
            (t) => t.x === x && t.y === y
          )?.type;
          const playersHere = players?.filter((p) => p.x === x && p.y === y);
          return (
            <div
              key={`${x},${y}`}
              className={`
                w-8 h-8 flex
                ${canJoinGame ? 'cursor-pointer hover:ring' : null}
              `}
              style={{
                gridColumn: x + 1,
                gridRow: y + 1,
              }}
            >
              <div className="flex flex-wrap relative">
                {terrain ? (
                  <div className="w-8 h-8 absolute inset-0 flex items-center justify-center text-3xl pointer-events-none">
                    <img
                      className="w-full h-full object-cover"
                      src={terrain.src}
                      alt="sample"
                    />
                  </div>
                ) : null}
                <div className="relative">
                  {playersHere?.map((p) => (
                    <span key={p.entity}>{p.playerIcon}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
