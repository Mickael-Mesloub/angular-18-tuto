import { Component, computed, inject, model, signal } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monster-list',
  imports: [CommonModule, PlayingCardComponent, SearchBarComponent],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.css',
})
export class MonsterListComponent {
  monsters = signal<Monster[]>([]);
  search = model('');
  private monsterService = inject(MonsterService);
  private router = inject(Router);

  filteredMonsters = computed(() => {
    return this.monsters().filter((monster) =>
      monster.name.toLocaleLowerCase().includes(this.search().toLowerCase())
    );
  });

  constructor() {
    this.monsters.set(this.monsterService.getAll());
  }

  addMonster() {
    this.router.navigate(['/monster']);
  }

  openMonster(monster: Monster) {
    this.router.navigate(['/monster', monster.id]);
  }
}
