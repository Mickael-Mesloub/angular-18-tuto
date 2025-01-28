import { Component } from '@angular/core';
import { PlayingCardComponent } from './components/playing-card/playing-card.component';
import { Monster } from './models/monster.model';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [PlayingCardComponent, SearchBarComponent],
})
export class AppComponent {
  monster1!: Monster;
  clickCount: number = 0;
  searchValue: string = '';

  constructor() {
    this.monster1 = new Monster();
    this.monster1.name = 'Pik';
    this.monster1.hp = 40;
    this.monster1.figureCaption = 'N°002 Pik';
    this.monster1.attackName = 'Geo Impact';
    this.monster1.attackStrength = 60;
    this.monster1.attackDescription =
      'A powerful attack that can destroy anything in its path.';
  }

  incrementClickCount() {
    this.clickCount++;
  }
}
