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
  listOfSearch: Pokemon[] = [];
  isLoading?: boolean;
  pokemon?: Pokemon;

  errorNotFound = false;

  constructor(private pokemonService: PokemonService) {
  };

  isPokemon(Pokemon: Pokemon | null) {
    return Pokemon === null;
  };

  onSearch(searchTerm: string) {
    this.isLoading = true;
    this.pokemonService.getPokemon(searchTerm).subscribe(
      (pokemon) => {
        if (this.isPokemon(pokemon)) {
          this.errorNotFound = true;
        }else {
          this.pokemon = pokemon!;
          this.listOfSearch.push(this.pokemon!);
        }
        this.isLoading = false;
      }
    );
  }
}
