// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { Health, Attack, Defense, Size, Affinity } from "./codegen/Tables.sol";
import { ElementType, SizeType } from "./codegen/Types.sol";
import { CombatSystem } from "./systems/CombatSystem.sol";

// Returns fraction
function affinityModifier(ElementType a, ElementType b) pure returns (uint256, uint256) {
    // TODO: is it balanced?
    if (a == ElementType.Fire  && a == ElementType.Earth)  return (4, 3);
    if (a == ElementType.Fire  && a == ElementType.Water)  return (3, 4);
    if (a == ElementType.Water && b == ElementType.Fire)   return (4, 3);
    if (a == ElementType.Water && b == ElementType.Earth)  return (3, 4);
    if (a == ElementType.Earth && b == ElementType.Water)  return (4, 3);
    if (a == ElementType.Earth && b == ElementType.Fire)   return (3, 4);
    if (a == ElementType.Air   && b == ElementType.Fire)   return (4, 3);
    if (a == ElementType.Air   && b == ElementType.Earth)  return (3, 4);

    return (1, 1);
}

// Returns fraction
function sizeAttackModifier(SizeType size) pure returns (uint256, uint256) {
    if (size == SizeType.Small) return (10, 11);
    if (size == SizeType.Large) return (11, 10);
    return (1, 1);
}

// Returns fraction
function sizeDefenseModifier(SizeType size) pure returns (uint256, uint256) {
    if (size == SizeType.Large) return (10, 11);
    if (size == SizeType.Small) return (11, 10);
    return (1, 1);
}

function getEffectiveAttack(bytes32 entityA, bytes32 entityB) view returns(uint256) {
    (uint256 affinityA, uint256 affinityB) = affinityModifier(Affinity.get(entityA), Affinity.get(entityB));
    (uint256 sizeA, uint256 sizeB) = sizeAttackModifier(Size.get(entityA));
    return Attack.get(entityA) * affinityA * sizeA / affinityB / sizeB;
}

function getEffectiveDefense(bytes32 entityA, bytes32 _entityB) view returns(uint256) {
    (uint256 sizeA, uint256 sizeB) = sizeDefenseModifier(Size.get(entityA));
    return Defense.get(entityA) * sizeA / sizeB;
}

function getDamage(bytes32 entityA, bytes32 entityB) view returns(uint256) {
    uint256 effectiveAttack = getEffectiveAttack(entityA, entityB);
    uint256 effectiveDefense = getEffectiveDefense(entityA, entityB);
    if (effectiveAttack > effectiveDefense) {
        return effectiveAttack - effectiveDefense;
    }
    return 0;
}

contract Battle {
    uint256 public healthA;
    bytes32 public entityA;
    uint256 public healthB;
    bytes32 public entityB;

    bool public isTurnA;

    constructor(bytes32 _entityA, bytes32 _entityB) {
        entityA = _entityA;
        entityB = _entityB;
        healthA = Health.get(entityA);
        healthB = Health.get(entityB);
        isTurnA = true;
    }

    function attack() public {
        if (isTurnA) {
            healthA -= getDamage(entityA, entityB);
        } else {
            healthB -= getDamage(entityB, entityA);
        }
        isTurnA = !isTurnA;
    }
}
