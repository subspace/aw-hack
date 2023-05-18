// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {System} from "@latticexyz/world/src/System.sol";

contract MoveSystem is System {
    function move(uint32 x, uint32 y) public {
        require(false, "todo");
    }

    function distance(uint32 fromX, uint32 fromY, uint32 toX, uint32 toY) internal pure returns (uint32) {
        uint32 deltaX = fromX > toX ? fromX - toX : toX - fromX;
        uint32 deltaY = fromY > toY ? fromY - toY : toY - fromY;
        return deltaX + deltaY;
    }
}
