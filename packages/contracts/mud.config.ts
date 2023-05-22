import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  enums: {
    TerrainType: ["Grass", "Water", "Forest", "Mountain", "Sand", "Village"],
    ElementType: ["Water", "Fire", "Earth", "Air"],
    SizeType: ["Small", "Medium", "Large"],
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
    Shop: {
      // TODO: Should it be singleton?
      keySchema: {},
      dataStruct: false,
      schema: {
        // Address for shop inventory
        shopInventory: "address",
        monsterPrice: "uint256",
      },
    },

    // Components:
    Movable: "bool",
    Position: {
      dataStruct: false,
      schema: { x: "uint32", y: "uint32" },
    },
    Obstruction: "bool",
    Player: "bool",
    OwnedBy: "bytes32",

    Name: "string",
    Affinity: "ElementType",
    Attack: "uint256",
    Defense: "uint256",
    Size: "SizeType",
    Health: "uint256",
  },

  modules: [
    {
      name: "UniqueEntityModule",
      root: true,
      args: [],
    },
  ],
});
