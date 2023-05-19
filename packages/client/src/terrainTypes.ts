export enum TerrainType {
  Grass,
  Water,
  Forest,
  Mountain,
  Sand,
}

type TerrainConfig = {
  emoji: string;
};

// TODO: replace emoji with images
export const terrainTypes: Record<TerrainType, TerrainConfig> = {
  [TerrainType.Grass]: {
    emoji: "",
  },
  [TerrainType.Mountain]: {
    emoji: "🪨",
  },
  [TerrainType.Water]: {
    emoji: "🌊",
  },
  [TerrainType.Sand]: {
    emoji: "🏖️",
  },
  [TerrainType.Forest]: {
    emoji: "🌲",
  },
};
