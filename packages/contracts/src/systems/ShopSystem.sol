// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { Shop } from "../codegen/Tables.sol";
import { addressToEntityKey } from "../utils.sol";
import { ShopInventory } from "../shop_inventory.sol";
import { monsterEntity, Monster } from "../entities.sol";

contract ShopSystem is System {
    function buy(uint256 monsterType) public payable returns (bytes32) {
        (address inventoryAddress, uint256 monsterPrice) = Shop.get();
        ShopInventory inventory = ShopInventory(inventoryAddress);

        require(monsterType < inventory.numberOfMonsters(), "There is no such monster");
        require((payable(0)).send(monsterPrice), "Failed to buy monster. Not enough Ether!");

        bytes32 monsterId = getUniqueEntity();
        (string memory name, uint256 health, uint256 power) = inventory.monsters(monsterType);
        Monster memory monster = Monster({ name: name, health: health, power: power });
        monsterEntity(monsterId, monster, addressToEntityKey(msg.sender));
        return monsterId;
    }

    function getInventory() public view returns(ShopInventory) {
        (address inventoryAddress,) = Shop.get();
        return ShopInventory(inventoryAddress);
    }
}
