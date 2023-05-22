// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { OwnedBy } from "../codegen/Tables.sol";
import { entityKeyToAddress, addressToEntityKey } from "../utils.sol";

contract NftSystem is ERC721 {
    constructor() ERC721("GameItem", "MGI") public {}

    function entityOwner(uint256 entityId) public view returns (address) {
        return entityKeyToAddress(OwnedBy.get(bytes32(entityId)));
    }

    function mint(address to, bytes32 entityId) public {
        // TODO: Add any necessary logic before minting (e.g., ensuring that the caller has permission)
        _mint(to, uint256(entityId));
        OwnedBy.set(entityId, addressToEntityKey(to));
    }

    function burn(uint256 entityId) public {
        // TODO: Add any necessary logic before burning (e.g., ensuring that the caller has permission)
        _burn(entityId);
        OwnedBy.deleteRecord(bytes32(entityId));
    }

    function transferFrom(address from, address to, uint256 entityId) public override {
        // TODO: Add any necessary logic before transferring (e.g., ensuring that the caller has permission)

        super.transferFrom(from, to, entityId);
        OwnedBy.set(bytes32(entityId), addressToEntityKey(to));
    }
}
