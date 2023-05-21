import grass from "./assets/images/tileset/grass/grassBase2.png";
import water from "./assets/images/tileset/water/waterBase.png";
import sand from "./assets/images/tileset/ground/groundBase.png";
import tree from "./assets/images/tileset/tree/tree1.png";
import mountain from "./assets/images/tileset/mountainBase.png";
import house from "./assets/images/tileset/buildings/house1.png";

export enum TerrainType {
  Grass,
  Water,
  Forest,
  Mountain,
  Sand,
  Village,
}

type TerrainConfig = {
  src: string;
};

export const terrainTypes: Record<TerrainType, TerrainConfig> = {
  [TerrainType.Grass]: {
    src: grass,
  },
  [TerrainType.Mountain]: {
    src: mountain,
  },
  [TerrainType.Water]: {
    src: water,
  },
  [TerrainType.Sand]: {
    src: sand,
  },
  [TerrainType.Forest]: {
    src: tree,
  },
  [TerrainType.Village]: {
    src: house,
  },
};
