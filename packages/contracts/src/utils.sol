// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

function addressToEntityKey(address addr) pure returns (bytes32) {
    return bytes32(uint256(uint160(addr)));
}

function positionToEntityKey(uint32 x, uint32 y) pure returns (bytes32) {
    return keccak256(abi.encode(x, y));
}
