// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {System} from "@latticexyz/world/src/System.sol";
import {PlayerComponent as Player, MovableComponent as Movable, PositionComponent as Position, Map} from "../codegen/Tables.sol";
import {playerEntity} from "../entities.sol";
import {addressToEntityKey} from "../utils.sol";
import { positionToEntityKey } from "../positionToEntityKey.sol";

contract MoveSystem is System {
    function move(uint32 x, uint32 y) public {
        bytes32 player = addressToEntityKey(_msgSender());
        require(Movable.get(player), "cannot move");

        (uint32 fromX, uint32 fromY) = Position.get(player);
        require(distance(fromX, fromY, x, y) == 1, "can only move to adjacent spaces");

        // TODO: check for obstructions
        // bytes32 position = positionToEntityKey(x, y);
        // require(!Obstruction.get(position), "this space is obstructed");

        // Constrain position to map size, wrapping around if necessary
        (uint32 width, uint32 height, ) = Map.get();
        x = (x + width) % width;
        y = (y + height) % height;

        Position.set(player, x, y);
    }

    function spawn(uint32 x, uint32 y) public {
        bytes32 player = addressToEntityKey(address(_msgSender()));
        require(!Player.get(player), "already spawned");

        playerEntity(player, x, y);
    }

    function distance(uint32 fromX, uint32 fromY, uint32 toX, uint32 toY) internal pure returns (uint32) {
        uint32 deltaX = fromX > toX ? fromX - toX : toX - fromX;
        uint32 deltaY = fromY > toY ? fromY - toY : toY - fromY;
        return deltaX + deltaY;
    }
}
