import { Component, computed, model } from '@angular/core';
import { PlayingCardComponent } from './components/playing-card/playing-card.component';
import { Monster } from './models/monster.model';
import { MonsterType } from './utils/monster.utils';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [CommonModule, PlayingCardComponent, SearchBarComponent],
})
export class AppComponent {
  monsters!: Monster[];
  search = model('');

  filteredMonsters = computed(() => {
    return this.monsters.filter((monster) =>
      monster.name.toLocaleLowerCase().includes(this.search().toLowerCase())
    );
  });

  constructor() {
    this.monsters = [];

    const monster1 = new Monster();
    monster1.name = 'Pik';
    monster1.hp = 40;
    monster1.figureCaption = 'N°002 Pik';
    monster1.attackName = 'Geo Impact';
    monster1.attackStrength = 60;
    monster1.attackDescription =
      'A powerful attack that can destroy anything in its path.';
    this.monsters.push(monster1);

    const monster2 = new Monster();
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
