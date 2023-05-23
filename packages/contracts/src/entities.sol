// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {
    Player,
    Position,
    Movable,
    Name,
    Health,
    Attack,
    Defense,
    Size,
    Affinity,
    OwnedBy
} from "./codegen/Tables.sol";
import { SizeType, ElementType } from "./codegen/Types.sol";

struct Monster {
    string name;
    ElementType affinity;
    uint256 health;
    uint256 attack;
    uint256 defense;
    SizeType size;
}

function playerEntity(bytes32 id, uint32 x, uint32 y) {
    Player.set(id, true);
    Position.set(id, x, y);
    Movable.set(id, true);
}

function monsterEntity(bytes32 id, Monster memory monster, bytes32 owner) {
    Name.set(id, monster.name);
    Affinity.set(id, monster.affinity);
    Health.set(id, monster.health);
    Attack.set(id, monster.attack);
    Defense.set(id, monster.defense);
    Size.set(id, monster.size);
    OwnedBy.set(id, owner);
}
