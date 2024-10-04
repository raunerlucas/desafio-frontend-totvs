import {Injectable} from '@angular/core';
import {PokemonModel} from '../model/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storageKey = 'listOfSearch';

  constructor() { }

  getListOfSearch(): PokemonModel[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveListToLocalStorage(list: PokemonModel[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  }

  isPokemonInList(pokemon: PokemonModel): number {
    const list = this.getListOfSearch();
    return list.findIndex(p => p.name === pokemon.name);
  }

  isPokemonInListByName(searchTerm: string) : PokemonModel | undefined {
    const list = this.getListOfSearch();
    return list.find(p => p.name.toLowerCase() === searchTerm.toLowerCase());
  }
}
