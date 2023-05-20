import { Has, HasValue, getComponentValue, runQuery } from "@latticexyz/recs";
import { uuid, awaitStreamValue } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { playerEntity, singletonEntity, worldSend, txReduced$ }: SetupNetworkResult,
  { Map, PositionComponent, PlayerComponent, ObstructionComponent }: ClientComponents
) {
  const wrapPosition = (x: number, y: number) => {
    const mapConfig = getComponentValue(Map, singletonEntity);
    if (!mapConfig) {
      throw new Error("mapConfig no yet loaded or initialized");
    }
    return [
      (x + mapConfig.width) % mapConfig.width,
      (y + mapConfig.height) % mapConfig.height,
    ];
  };

  const isObstructed = (x: number, y: number) => {
    return runQuery([Has(ObstructionComponent), HasValue(PositionComponent, { x, y })]).size > 0;
  };

  const moveTo = async (inputX: number, inputY: number) => {
    if (!playerEntity) {
      throw new Error("no player");
    }

    const [x, y] = wrapPosition(inputX, inputY);
    console.log('isObstructed(x, y)', isObstructed(x, y))
    if (isObstructed(x, y)) {
      console.warn("cannot move to obstructed space");
      return;
    }

    const positionId = uuid();
    PositionComponent.addOverride(positionId, {
      entity: playerEntity,
      value: { x, y },
    });

    try {
      const tx = await worldSend("move", [x, y]);
      await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    } finally {
      PositionComponent.removeOverride(positionId);
    }
  };

  const moveBy = async (deltaX: number, deltaY: number) => {
    if (!playerEntity) {
      throw new Error("no player");
    }

    const playerPosition = getComponentValue(PositionComponent, playerEntity);
    if (!playerPosition) {
      console.warn("cannot moveBy without a player position, not yet spawned?");
      return;
    }

    await moveTo(playerPosition.x + deltaX, playerPosition.y + deltaY);
  };

  const spawn = async (inputX: number, inputY: number) => {
    if (!playerEntity) {
      throw new Error("no player");
    }

    const canSpawn = getComponentValue(PlayerComponent, playerEntity)?.value !== true;
    if (!canSpawn) {
      throw new Error("already spawned");
    }

    const [x, y] = wrapPosition(inputX, inputY);
    if (isObstructed(x, y)) {
      console.warn("cannot spawn on obstructed space");
      return;
    }

    const positionId = uuid();
    PositionComponent.addOverride(positionId, {
      entity: playerEntity,
      value: { x, y },
    });
    const playerId = uuid();
    PlayerComponent.addOverride(playerId, {
      entity: playerEntity,
      value: { value: true },
    });

    try {
      const tx = await worldSend("spawn", [x, y]);
      await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    } finally {
      PositionComponent.removeOverride(positionId);
      PlayerComponent.removeOverride(playerId);
    }
  };

  return {
    spawn,
    moveBy,
  };
}
