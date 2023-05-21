import grass from "./assets/images/tileset/grass/grassBase2.png";
import water from "./assets/images/tileset/water/waterBase.png";
import sand from "./assets/images/tileset/ground/groundBase.png";
import tree from "./assets/images/tileset/tree/tree1.png";
import mountain from "./assets/images/tileset/mountainBase.png";
import house from "./assets/images/tileset/buildings/house1.png";
import well from "./assets/images/tileset/buildings/well.png";
import church from "./assets/images/tileset/buildings/church.png";
import treeVillage from "./assets/images/tileset/tree/tree2.png";
import detail from "./assets/images/tileset/ground/groundDetail1.png";

export enum TerrainType {
  Grass,
  Water,
  Forest,
  Mountain,
  Sand,
  Village,
}

export enum VillageBuildingsType {
  House,
  Path,
  Church,
  Well,
  PathDetail,
  Grass,
  Tree,
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

export const villageBuildings: Record<VillageBuildingsType, TerrainConfig> = {
  [VillageBuildingsType.Grass]: {
    src: grass,
  },
  [VillageBuildingsType.House]: {
    src: house,
  },
  [VillageBuildingsType.Church]: {
    src: church,
  },
  [VillageBuildingsType.Tree]: {
    src: treeVillage,
  },
  [VillageBuildingsType.Path]: {
    src: sand,
  },
  [VillageBuildingsType.PathDetail]: {
    src: detail,
  },
  [VillageBuildingsType.Well]: {
    src: well,
  },
};
