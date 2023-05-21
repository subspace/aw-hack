import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import { hexToArray } from "@latticexyz/utils";
import { Has, getComponentValueStrict } from "@latticexyz/recs";
import { useMUD } from "./MUDContext";
import { villageBuildings, VillageBuildingsType } from "./terrainTypes";
import { PlayerIcon } from "./PlayerIcon";
import { useKeyboardMovement } from "./useKeyboardMovement";

export const Village = () => {
  const mud = useMUD();

  const {
    components: { Village, PositionComponent, PlayerComponent },
    network: { singletonEntity, playerEntity },
    systemCalls: { spawn },
  } = mud;

  useKeyboardMovement();

  const players = useEntityQuery([
    Has(PlayerComponent),
    Has(PositionComponent),
  ]).map((entity) => {
    const position = getComponentValueStrict(PositionComponent, entity);
    return {
      entity,
      x: position.x,
      y: position.y,
      playerIcon:
        entity === playerEntity ? <PlayerIcon isMyPlayer /> : <PlayerIcon />,
    };
  });

  const canJoinGame =
    useComponentValue(PlayerComponent, playerEntity)?.value !== true;
  const village = useComponentValue(Village, singletonEntity);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { width, height, terrain } = village!;
  const rows = new Array(height).fill(0).map((_, i) => i);
  const columns = new Array(width).fill(0).map((_, i) => i);

  const terrainValues = Array.from(hexToArray(terrain)).map((value, index) => {
    return {
      x: index % width,
      y: Math.floor(index / width),
      value,
      type:
        value in VillageBuildingsType
          ? villageBuildings[value as VillageBuildingsType]
          : null,
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
                w-8 h-8 flex items-center justify-center
                ${canJoinGame ? "cursor-pointer hover:ring" : null}
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
