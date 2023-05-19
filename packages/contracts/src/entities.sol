// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {
    PlayerComponent as Player, PositionComponent as Position, MovableComponent as Movable
} from "./codegen/Tables.sol";

function playerEntity(bytes32 id, uint32 x, uint32 y) {
    Player.set(id, true);
    Position.set(id, x, y);
    Movable.set(id, true);
}
