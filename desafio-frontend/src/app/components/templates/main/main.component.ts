import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {PoModule} from '@po-ui/ng-components';
import {FormsModule} from "@angular/forms";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    PoModule,
    FormsModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent {
  searchTerm: string = "";
  pokemonData: any = null;

  async onSearch() {
    try {
      const url = `${environment.apiPokemosBase}pokemon/${this.searchTerm.toLowerCase()}`;
      const response = await fetch(url);

      if (!response.ok) {
        response.status == 404 ? alert('Pokémon não encontrado') : null;
        throw new Error(`Erro ao buscar Pokémon: ${response.status}`);
      }

      this.pokemonData = await response.json();
      console.log(this.pokemonData);

    } catch (error) {
      console.error('Erro ao buscar Pokémon:', error);

    }
  }
}
