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

  // @Input() searchValue: string = 'Search something';
  // @Output() searchValueChange: EventEmitter<string> = new EventEmitter<string>();
  // @Output() searchButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  // Version avec input() et output()

  // searchValue: InputSignal<string> = input<string>('Search something');
  // searchValueChange: OutputEmitterRef<string> = output<string>();
  // searchButtonClicked: OutputEmitterRef<void> = output({ alias: 'submit' });

  // searchClick() {
  //   console.log('Search button clicked');
  //   this.searchButtonClicked.emit();
  // }

  // updateSearch(value: string) {
  //   this.searchValueChange.emit(value);
  // }

  // Version avec model -> plus besoin de updateSearch() car [(ngModel)]="searchValue" se charge automatiquement de la mise à jour de la valeur de searchValue
  searchValue: ModelSignal<string> = model<string>('Search something');
  searchButtonClicked: OutputEmitterRef<void> = output({ alias: 'submit' });

  searchClick() {
    console.log('Search button clicked');
    this.searchButtonClicked.emit();
  }
}
