import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  enums: {
    TerrainType: ["Grass", "Water", "Forest", "Mountain", "Sand"],
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
    PlayerComponent: "bool",
    MovableComponent: "bool",
    PositionComponent: {
      dataStruct: false,
      schema: { x: "uint32", y: "uint32" },
    },
    NameComponent: "string",
    HealthComponent: "uint256",
    PowerComponent: "uint256",
    ObstructionComponent: "bool",
  },

  modules: [
    {
      name: "UniqueEntityModule",
      root: true,
      args: [],
    },
  ],
});
