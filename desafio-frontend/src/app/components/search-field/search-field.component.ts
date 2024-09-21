import {Component, EventEmitter, Output} from '@angular/core';
import {PoFieldModule} from "@po-ui/ng-components";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [
    PoFieldModule,
    FormsModule
  ],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.css'
})
export class SearchFieldComponent {
  searchTerm = "";

  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchTerm);
  }

}
