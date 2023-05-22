// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { Battle } from "../battle.sol";
import { ElementType, SizeType } from "../codegen/Types.sol";

contract CombatSystem is System {
    function startBattle(bytes32 entityA, bytes32 entityB) public returns (Battle) {
        // TODO: check that these entities
        return new Battle(entityA, entityB);
    }
}
