// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { Monster } from "./entities.sol";

contract ShopInventory {
    Monster[] public monsters;

    constructor(Monster[] memory _monsters) public {
        for (uint256 i = 0; i < _monsters.length; i++) {
            monsters.push(_monsters[i]);
        }
    }

    function getMonster(uint256 monsterType) public view returns (Monster memory) {
        require(monsterType < monsters.length, "There is no such monster");
        return monsters[monsterType];
    }

    function numberOfMonsters() public view returns (uint256) {
        return monsters.length;
    }
}
