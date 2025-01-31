import { Component, computed, inject, model, signal } from '@angular/core';
import { PlayingCardComponent } from './components/playing-card/playing-card.component';
import { Monster } from './models/monster.model';
import { MonsterType } from './utils/monster.utils';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MonsterService } from './services/monster/monster.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [CommonModule, PlayingCardComponent, SearchBarComponent],
})
export class AppComponent {
  monsters = signal<Monster[]>([]);
  search = model('');
  monsterService = inject(MonsterService);

  filteredMonsters = computed(() => {
    return this.monsters().filter((monster) =>
      monster.name.toLocaleLowerCase().includes(this.search().toLowerCase())
    );
  });

  constructor() {
    this.monsters.set(this.monsterService.getAll());
  }

  addMonster() {
    const genericMonster = new Monster();
    this.monsterService.add(genericMonster);
    this.monsters.set(this.monsterService.getAll());
  }
}
