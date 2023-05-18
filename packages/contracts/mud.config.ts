import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    PlayerComponent: "bool",
    MovableComponent: "bool",
    PositionComponent: {
      dataStruct: false,
      schema: { x: "uint32", y: "uint32" },
    },
    NameComponent: "string",
    HealthComponent: "uint256",
    PowerComponent: "uint256",
  },

  modules: [
    {
      name: "UniqueEntityModule",
      root: true,
      args: [],
    },
  ],
});
