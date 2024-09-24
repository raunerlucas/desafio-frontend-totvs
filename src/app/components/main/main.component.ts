import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {PoModule} from '@po-ui/ng-components';
import {FormsModule} from "@angular/forms";
import {PokemonModel} from "../../model/pokemon.model";
import {PokemonService} from "../../services/pokemon.service";
import {SearchFieldComponent} from "../search-field/search-field.component";
import {ErrorComponent} from "../error/error.component";
import {CollapsableCardComponent} from "../collapsable-card/collapsable-card.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    PoModule,
    FormsModule,
    SearchFieldComponent,
    ErrorComponent,
    CollapsableCardComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent {
  listOfSearch: PokemonModel[] = JSON.parse(localStorage.getItem('listOfSearch') || '[]');
  isLoading?: boolean;
  pokemon?: PokemonModel;

  errorNotFound = false;

  constructor(private pokemonService: PokemonService) {
  };

  saveListToLocalStorage() {
    localStorage.setItem('listOfSearch', JSON.stringify(this.listOfSearch));
  }


  onSearch(searchTerm: string) {
    this.isLoading = true;
    this.pokemonService.getPokemon(searchTerm).subscribe(
      (pokemon) => {
        if (pokemon === null) {
          this.errorNotFound = true;
        } else {
          this.errorNotFound = false;
          this.pokemon = pokemon!;
          this.listOfSearch.push(this.pokemon!);
          this.saveListToLocalStorage();
        }
        this.isLoading = false;
      }
    );
  }
}
