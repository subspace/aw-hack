import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  enums: {
    TerrainType: ["Grass", "Water", "Forest", "Mountain", "Sand", "Village"],
  },
  tables: {
    // Singletons:
    Map: {
      keySchema: {},
      dataStruct: false,
      schema: {
        width: "uint32",
        height: "uint32",
        terrain: "bytes",
      },
    },

    // Components:
    Player: "bool",
    Movable: "bool",
    Position: {
      dataStruct: false,
      schema: { x: "uint32", y: "uint32" },
    },
    Name: "string",
    Health: "uint256",
    Power: "uint256",
    Obstruction: "bool",
  },

  modules: [
    {
      name: "UniqueEntityModule",
      root: true,
      args: [],
    },
  ],
});
