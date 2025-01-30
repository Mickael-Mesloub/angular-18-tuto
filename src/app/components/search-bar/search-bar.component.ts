import {
  Component,
  // EventEmitter,
  // input,
  // InputSignal,
  model,
  ModelSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  // Version avec @Input() et @Output()

  // @Input() search: string = 'Search something';
  // @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();
  // @Output() searchButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  // Version avec input() et output()

  // search: InputSignal<string> = input<string>('Search something');
  // searchChange: OutputEmitterRef<string> = output<string>();
  // searchButtonClicked: OutputEmitterRef<void> = output({ alias: 'submit' });

  // searchClick() {
  //   console.log('Search button clicked');
  //   this.searchButtonClicked.emit();
  // }

  // updateSearch(value: string) {
  //   this.searchChange.emit(value);
  // }

  // Version avec model -> plus besoin de updateSearch() car [(ngModel)]="search" se charge automatiquement de la mise à jour de la valeur de search
  search: ModelSignal<string> = model<string>('Search something');
  searchButtonClicked: OutputEmitterRef<void> = output({ alias: 'submit' });

  searchClick() {
    console.log('Search button clicked');
    this.searchButtonClicked.emit();
  }
}
