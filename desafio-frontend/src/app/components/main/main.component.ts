import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {PoModule} from '@po-ui/ng-components';
import {FormsModule} from "@angular/forms";
import {Pokemon} from "../../model/Pokemon";
import {PokemonService} from "../../services/pokemon.service";
import {SearchFieldComponent} from "../search-field/search-field.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    PoModule,
    FormsModule,
    SearchFieldComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent {
  searchTerm = '';
  pokemon: Pokemon | null = null;
  listSearch: Pokemon[] = [];
  isLoading = false; // Para indicar quando a requisição está em andamento

  constructor(private pokemonService: PokemonService) {}

  onSearch() {
    this.isLoading = true;
    this.pokemonService.getPokemon(this.searchTerm).subscribe(
      (pokemon) => {
        this.pokemon = pokemon;
        this.isLoading = false;
        this.listSearch.push(pokemon as Pokemon);
      }
    );
  }
}
