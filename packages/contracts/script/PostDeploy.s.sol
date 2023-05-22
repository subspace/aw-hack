// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {IWorld} from "../src/codegen/world/IWorld.sol";
import {TerrainType} from "../src/codegen/Types.sol";
import {Map, Position, Obstruction} from "../src/codegen/Tables.sol";
import { positionToEntityKey } from "../src/utils.sol";

function getMap() pure returns(TerrainType[32][32] memory) {
    TerrainType G = TerrainType.Grass;
    TerrainType W = TerrainType.Water;
    TerrainType F = TerrainType.Forest;
    TerrainType M = TerrainType.Mountain;
    TerrainType S = TerrainType.Sand;
    TerrainType V = TerrainType.Village;

    return [
        [G, G, G, G, G, G, G, F, F, F, F, F, F, F, W, W, W, W, F, M, F, M, F, F, F, F, F, M, M, G, G, G],
        [G, G, G, G, G, G, G, F, F, F, F, F, F, F, S, W, W, W, M, M, M, M, F, F, M, M, M, M, M, M, G, G],
        [G, G, G, G, G, G, G, G, G, F, F, F, F, G, G, S, S, S, M, M, M, M, M, F, F, M, M, M, G, S, W, W],
        [G, G, G, G, G, G, G, G, G, F, F, F, F, F, F, G, M, M, M, M, M, M, M, W, M, M, M, G, S, W, W, S],
        [G, G, G, G, G, G, G, G, F, F, F, F, F, M, M, G, G, G, G, G, G, G, W, W, G, G, G, G, S, W, W, S],
        [G, S, S, W, W, G, G, G, G, G, G, M, M, G, G, G, G, G, G, G, G, G, W, W, G, G, G, G, S, W, S, S],
        [S, G, G, W, W, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, W, W, G, G, G, S, W, S, S],
        [S, G, G, W, W, G, G, G, F, F, F, G, G, G, G, G, G, G, G, G, G, G, G, G, W, G, G, G, S, W, S, S],
        [S, F, W, G, G, G, G, G, F, F, F, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, S, W, W, W],
        [S, G, G, W, W, G, G, F, F, F, F, F, G, G, G, G, G, F, F, F, F, F, F, F, F, F, G, G, G, S, W, W],
        [G, G, G, W, W, G, G, F, F, F, F, F, F, F, F, G, G, F, F, M, F, F, M, F, F, F, F, F, F, S, W, W],
        [G, G, G, G, W, G, V, G, G, G, F, G, M, M, M, F, F, F, F, F, F, F, M, F, F, M, F, F, M, S, W, W],
        [G, G, F, G, G, G, G, G, G, G, G, G, G, M, M, F, F, F, F, F, F, M, M, F, F, F, F, F, M, S, W, W],
        [F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, M, F, F, F, F, F, F, F, F, F, F, F, F, F, S, S],
        [M, M, M, M, M, M, M, M, M, M, M, M, F, F, F, F, F, M, F, F, F, F, F, M, F, F, F, F, F, F, F, F],
        [M, M, M, M, M, M, M, M, M, M, M, M, F, F, F, F, F, F, M, F, F, F, F, F, F, M, F, F, F, F, G, G],
        [G, W, W, W, G, G, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F],
        [G, W, W, W, W, G, G, F, F, F, F, F, M, F, F, F, F, F, F, F, F, F, F, F, M, F, F, F, F, M, M, M],
        [G, W, W, W, G, G, V, G, G, M, M, M, M, F, F, F, F, F, F, F, F, F, F, M, M, M, M, M, M, M, M, M],
        [G, W, W, G, G, G, G, G, G, M, M, M, M, M, M, M, F, F, F, F, F, F, F, F, M, M, M, M, M, M, M, M],
        [G, G, G, G, G, G, G, G, G, G, M, M, M, M, M, M, M, M, F, F, F, F, F, F, F, F, M, F, F, F, F, F],
        [G, S, S, G, G, G, G, G, G, G, M, M, M, M, M, M, M, M, M, M, F, F, F, F, M, F, F, M, F, F, F, F],
        [G, S, S, S, W, G, G, G, G, G, W, G, G, G, G, G, G, G, G, G, G, F, F, F, F, F, F, F, F, F, F, F],
        [W, G, S, S, S, W, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, F, F, F, F, F, F, F, F, F, F, F],
        [W, G, G, G, G, G, G, M, M, M, M, M, F, F, F, F, F, F, F, F, F, F, F, M, F, F, F, F, M, F, F, F],
        [W, G, G, G, G, M, M, M, M, M, M, M, M, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, M, F],
        [W, M, M, M, M, M, M, M, M, M, M, M, M, F, F, F, F, F, F, F, F, F, F, F, F, F, F, M, F, F, F, F],
        [W, M, M, M, M, M, M, M, G, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, M, M, M],
        [W, W, W, G, G, G, G, G, G, F, F, F, F, F, F, F, M, M, M, M, M, F, F, F, F, F, F, M, M, F, M, M],
        [W, W, W, W, G, G, G, G, G, G, G, M, F, F, F, F, F, F, F, F, F, F, F, F, M, M, M, M, M, M, M, M],
        [W, W, W, G, G, G, G, G, G, G, G, G, G, F, F, F, F, F, F, F, F, F, M, F, F, F, F, F, F, F, F, M],
        [W, G, G, G, G, G, G, G, G, G, G, G, G, F, F, F, F, F, M, F, F, F, F, F, F, F, F, F, F, F, F, M]
    ];
}

contract PostDeploy is Script {
    function run(address worldAddress) external {
        console.log("Deployed world: ", worldAddress);
        IWorld world = IWorld(worldAddress);

        // Load the private key from the `PRIVATE_KEY` environment variable (in .env)
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start broadcasting transactions from the deployer account
        vm.startBroadcast(deployerPrivateKey);

        TerrainType[32][32] memory map = getMap();

        uint32 height = uint32(map.length);
        uint32 width = uint32(map[0].length);
        bytes memory terrain = new bytes(width * height);

        for (uint32 y = 0; y < height; y++) {
            for (uint32 x = 0; x < width; x++) {
                TerrainType terrainType = map[y][x];
                terrain[(y * width) + x] = bytes1(uint8(terrainType));

                bytes32 entity = positionToEntityKey(x, y);
                if (terrainType == TerrainType.Mountain || terrainType == TerrainType.Water) {
                    Position.set(world, entity, x, y);
                    Obstruction.set(world, entity, true);
                }
            }
        }

        Map.set(world, width, height, terrain);

        vm.stopBroadcast();
    }
}
