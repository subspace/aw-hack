// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {
    Player,
    Position,
    Movable,
    Name,
    Power,
    Health,
    OwnedBy
} from "./codegen/Tables.sol";

struct Monster {
    string name;
    uint256 health;
    uint256 power;
}

function playerEntity(bytes32 id, uint32 x, uint32 y) {
    Player.set(id, true);
    Position.set(id, x, y);
    Movable.set(id, true);
}

function monsterEntity(bytes32 id, Monster memory monster, bytes32 owner) {
    Name.set(id, monster.name);
    Power.set(id, monster.power);
    Health.set(id, monster.health);
    OwnedBy.set(id, owner);
}
