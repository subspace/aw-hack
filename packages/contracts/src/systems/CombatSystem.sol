// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { Battle } from "../battle.sol";
import { ElementType, SizeType } from "../codegen/Types.sol";
import { InBattle } from "../codegen/Tables.sol";

contract CombatSystem is System {
    function startBattle(bytes32 entityA, bytes32 entityB) public returns (Battle) {
        // TODO: check that these entities are present and not in battle
        Battle battle = new Battle(entityA, entityB);
        if (entityA < entityB) {
            InBattle.set(entityA, entityB, address(battle));
        } else {
            InBattle.set(entityB, entityA, address(battle));
        }
        return battle;
    }
}
