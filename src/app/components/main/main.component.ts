import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {PokemonModel} from "../../model/pokemon.model";
import {PokemonService} from "../../services/pokemon.service";
import {SearchFieldComponent} from "../search-field/search-field.component";
import {ErrorComponent} from "../error/error.component";
import {CardComponent} from "../card/card.component";
import {DetailsModalComponent} from "../details-modal/details-modal.component";
import {PokemonDetailsModel} from "../../model/pokemonDetails.model";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SearchFieldComponent,
    ErrorComponent,
    CardComponent,
    DetailsModalComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  listOfSearch: PokemonModel[] = this.localStorageService.getListOfSearch();
  pokemon!: PokemonDetailsModel | null;
  public errorNotFound = false;
  public searchedTerm= '';

  constructor(private pokemonService: PokemonService, private localStorageService: LocalStorageService) {
  }

  saveListToLocalStorage(pokemon: PokemonModel) {
    const pokemonInList = this.localStorageService.isPokemonInList(pokemon);
    const tamList = this.listOfSearch.length - 1;
    if (tamList !== pokemonInList || tamList === -1) {
      if (pokemonInList !== -1) {
        this.listOfSearch.splice(pokemonInList, 1);
      }
      this.listOfSearch.push(pokemon);
      this.localStorageService.saveListToLocalStorage(this.listOfSearch);
    }
  }

  onSearch(searchTerm: string) {
    if (!searchTerm.trim()) {
      this.thorowError();
      return;
    }
    const pokemonInList = this.localStorageService.isPokemonInListByName(searchTerm);
    if (pokemonInList) {
      this.openDetailsModal(pokemonInList);
      this.saveListToLocalStorage(pokemonInList);
      return;
    }
    this.pokemonService.getPokemon(searchTerm).subscribe(
      (pokemon) => {
        if (pokemon === null) {
          this.searchedTerm = searchTerm;
          this.thorowError();
        } else {
          this.openDetailsModal(pokemon);
          this.saveListToLocalStorage(pokemon);
        }
      }
    );
  }
  openDetailsModal(pokemon: PokemonModel) {
    this.pokemonService.getDetailsPokemon(pokemon).subscribe(
      (details) => {
        this.pokemon = details;
      }
    );
  }

  thorowError() {
    this.errorNotFound = true;
    setTimeout(() => {
      this.errorNotFound = false;
    }, 3000);
  }
}
