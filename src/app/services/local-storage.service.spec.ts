import {TestBed} from '@angular/core/testing';

import {LocalStorageService} from './local-storage.service';
import {PokemonModel} from '../model/pokemon.model';
import {MOCK_POKEMON, MOCK_POKEMON_LIST} from "../mocks/pokemon-data.mock";

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should save and retrieve list from local storage', () => {
    const mockList = MOCK_POKEMON_LIST;
    service.saveListToLocalStorage(mockList);
    const retrievedList = service.getListOfSearch();
    expect(retrievedList).toEqual(mockList);
  });

  it('should check if a Pokemon is in the list', () => {
    const mockList: PokemonModel[] = [MOCK_POKEMON];
    service.saveListToLocalStorage(mockList);
    const index = service.isPokemonInList(MOCK_POKEMON);
    expect(index).toBe(0);
  });

  it('should return -1 if a Pokemon is not in the list', () => {
    const mockList = MOCK_POKEMON_LIST;
    service.saveListToLocalStorage(mockList);
    const index = service.isPokemonInList({ name: 'Bulbasaur' } as PokemonModel);
    expect(index).toBe(-1);
  });

  it('should find a Pokemon by name', () => {
    const mockList = MOCK_POKEMON_LIST;
    service.saveListToLocalStorage(mockList);
    const pokemon = service.isPokemonInListByName('Pikachu');
    expect(pokemon).toEqual(MOCK_POKEMON);
  });

  it('should return undefined if a Pokemon is not found by name', () => {
    const mockList = MOCK_POKEMON_LIST;
    service.saveListToLocalStorage(mockList);
    const pokemon = service.isPokemonInListByName('charizard');
    expect(pokemon).toBeUndefined();
  });
});
