import { Injectable } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterType } from '../../utils/monster.utils';

@Injectable({
  providedIn: 'root',
})
export class MonsterService {
  monsters: Monster[] = [];
  currentIndex = 1;

  constructor() {
    this.load();
  }

  getAll(): Monster[] {
    return this.monsters.map((monster) => monster.copy());
  }

  get(id: number): Monster | undefined {
    return this.monsters.find((monster) => monster.id === id)?.copy();
  }

  add(monster: Monster): Monster {
    const monsterCopy = monster.copy();
    monsterCopy.id = this.currentIndex;
    this.monsters.push(monsterCopy.copy());
    this.currentIndex++;
    this.save();

    return monsterCopy;
  }

  update(monster: Monster): Monster {
    const monsterCopy = monster.copy();
    const monsterIndex = this.monsters.findIndex(
      (originalMonster) => originalMonster.id === monster.id
    );

    if (monsterIndex != -1) {
      this.monsters[monsterIndex] = monsterCopy.copy();
      this.save();
    }

    return monsterCopy;
  }

  delete(id: number): void {
    const monsterIndex = this.monsters.findIndex(
      (originalMonster) => originalMonster.id === id
    );

    if (monsterIndex != -1) {
      this.monsters.splice(monsterIndex, 1);
      this.save();
    }
  }

  private save() {
    localStorage.setItem('monsters', JSON.stringify(this.monsters));
  }

  private load() {
    const monsterData = localStorage.getItem('monsters');

    if (monsterData) {
      this.monsters = JSON.parse(monsterData).map((monsterJSON: any) =>
        Object.assign(new Monster(), monsterJSON)
      );
      this.currentIndex = Math.max(
        ...this.monsters.map((monster) => monster.id)
      );
    } else {
      this.init();
      this.save();
    }
  }

  private init() {
    this.monsters = [];

    const monster1 = new Monster();
    monster1.id = this.currentIndex++;
    monster1.name = 'Pik';
    monster1.hp = 40;
    monster1.figureCaption = 'N°002 Pik';
    monster1.attackName = 'Geo Impact';
    monster1.attackStrength = 60;
    monster1.attackDescription =
      'A powerful attack that can destroy anything in its path.';
    this.monsters.push(monster1);

    const monster2 = new Monster();
    monster2.id = this.currentIndex++;
    monster2.name = 'Cara';
    monster2.hp = 60;
    monster2.image = 'img/water_monster.webp';
    monster2.type = MonsterType.WATER;
    monster2.figureCaption = 'N°003 Cara';
    monster2.attackName = 'Water blast';
    monster2.attackStrength = 80;
    monster2.attackDescription =
      'A blast of water dealing significant damage to enemy.';
    this.monsters.push(monster2);

    const monster3 = new Monster();
    monster3.id = this.currentIndex++;
    monster3.name = 'Bulb';
    monster3.hp = 70;
    monster3.image = 'img/grass_monster.webp';
    monster3.type = MonsterType.GRASS;
    monster3.figureCaption = 'N°004 Bulb';
    monster3.attackName = 'Grass pop';
    monster3.attackStrength = 70;
    monster3.attackDescription =
      'Stingy grass pop that can cause irritation to the enemy.';
    this.monsters.push(monster3);

    const monster4 = new Monster();
    monster4.id = this.currentIndex++;
    monster4.name = 'Sala';
    monster4.hp = 60;
    monster4.image = 'img/fire_monster.webp';
    monster4.type = MonsterType.FIRE;
    monster4.figureCaption = 'N°005 Sala';
    monster4.attackName = 'Fireball';
    monster4.attackStrength = 60;
    monster4.attackDescription =
      'A fireball that can burn anything in its path.';
    this.monsters.push(monster4);
  }
}
