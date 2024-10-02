import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {PoModule} from '@po-ui/ng-components';
import {FormsModule} from "@angular/forms";
import {PokemonDetailsModel, PokemonModel} from "../../model/pokemon.model";
import {PokemonService} from "../../services/pokemon.service";
import {SearchFieldComponent} from "../search-field/search-field.component";
import {ErrorComponent} from "../error/error.component";
import {CollapsableCardComponent} from "../collapsable-card/collapsable-card.component";
import {DetailsModalComponent} from "../details-modal/details-modal.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    PoModule,
    FormsModule,
    SearchFieldComponent,
    ErrorComponent,
    CollapsableCardComponent,
    DetailsModalComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent {

  listOfSearch: PokemonModel[] = JSON.parse(localStorage.getItem('listOfSearch') || '[]');
  pokemon!: PokemonDetailsModel | null;
  protected errorNotFound = false;
  protected searchedTerm= '';

  constructor(private pokemonService: PokemonService) {
  };

  saveListToLocalStorage(pokemon: PokemonModel) {
    const index = this.listOfSearch.findIndex(p => p.id === pokemon.id);
    const tamList = this.listOfSearch.length - 1;
    if (tamList !== index || tamList === -1) {
      index !== -1 ? this.listOfSearch.splice(index, 1) : null;
      this.listOfSearch.push(pokemon);
      localStorage.setItem('listOfSearch', JSON.stringify(this.listOfSearch));
    }
  }

  onSearch(searchTerm: string) {
    this.pokemonService.getPokemon(searchTerm).subscribe(
      (pokemon) => {
        if (pokemon === null) {
          this.searchedTerm = searchTerm;
          this.thorowError()
        } else {
          this.openDetailsModal(pokemon)
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
