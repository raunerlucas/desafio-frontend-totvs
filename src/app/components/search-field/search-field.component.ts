import {Component, EventEmitter, Output} from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent {
  protected searchTerm = '';
  protected pokemonSuggestions: string[] = [];
  protected showSuggestions = false;

  @Output() search = new EventEmitter<string>();

  constructor(private pokemonService: PokemonService) {
  }

  onSearchChange() {
    this.pokemonService.getPokemonNames(this.searchTerm).subscribe(
      (suggestions: string[]) => {
        this.pokemonSuggestions = suggestions;
        this.showSuggestions = true;
      },
      (error) => {
        console.error("Erro ao obter sugestões:", error);
      }
    );
  }


  onSearch() {
    this.showSuggestions = false;
    this.search.emit(this.searchTerm);
    this.clearSearch();
  }

  onSuggestionClick(suggestion: string) {
    this.searchTerm = suggestion;
    this.onSearch();
  }

  clearSearch() {
    this.searchTerm = '';
  }
}
