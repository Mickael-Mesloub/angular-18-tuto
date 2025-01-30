import { Component, computed, effect, signal } from '@angular/core';
import { PlayingCardComponent } from './components/playing-card/playing-card.component';
import { Monster } from './models/monster.model';
import { MonsterType } from './utils/monster.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [PlayingCardComponent],
})
export class AppComponent {
  monsters!: Monster[];
  clickCount: number = 0;
  searchValue: string = '';

  selectedMonsterIndex = signal(1);
  selectedMonster = computed(() => {
    return this.monsters[this.selectedMonsterIndex()];
  });

  constructor() {
    effect(() => {
      console.log(this.selectedMonster());
    });

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
  }

  incrementClickCount() {
    this.clickCount++;
  }

  toggleMonster() {
    this.selectedMonsterIndex.set(
      (this.selectedMonsterIndex() + 1) % this.monsters.length
    );
  }
}
