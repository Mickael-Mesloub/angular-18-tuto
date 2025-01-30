export enum MonsterType {
  ELECTRIC = 'electric',
  FIRE = 'fire',
  GRASS = 'grass',
  WATER = 'water',
}

export interface IMonsterProperties {
  imageUrl: string;
  color: string;
}

export const MonsterTypeProperties: { [key: string]: IMonsterProperties } = {
  [MonsterType.ELECTRIC]: {
    imageUrl: 'img/electric.webp',
    color: 'rgb(255, 251, 42)',
  },
  [MonsterType.FIRE]: {
    imageUrl: 'img/fire.webp',
    color: 'rgb(255, 124, 124)',
  },
  [MonsterType.GRASS]: {
    imageUrl: 'img/grass.webp',
    color: 'rgb(135,255,124)',
  },
  [MonsterType.WATER]: {
    imageUrl: 'img/water.webp',
    color: 'rgb(124, 194, 255)',
  },
};
