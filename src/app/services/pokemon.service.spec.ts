import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from "../../environments/environment";
import {PokemonService} from './pokemon.service';
import {MOCK_POKEMON, MOCK_POKEMON_DETAILS, MOCK_POKEMON_LIST_RESPONSE} from "../testing/mock-pokemon-data";

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService]
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a Pokémon by name', () => {
    const dummyPokemon = MOCK_POKEMON
    service.getPokemon('pikachu').subscribe(pokemon => {
      expect(pokemon).toEqual(dummyPokemon);
    });

    const req = httpMock.expectOne(`${environment.apiPokemosBase}pokemon/pikachu`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPokemon);
  });

  it('should return null for empty Pokémon name', () => {
    service.getPokemon('').subscribe(pokemon => {
      expect(pokemon).toBeNull();
    });
  });

  it('should get all Pokémon names', () => {
    const dummyResponse = MOCK_POKEMON_LIST_RESPONSE
    service.getAllPokemonNames().subscribe(names => {
      expect(names).toEqual(['pikachu', 'bulbasaur']);
    });

    const req = httpMock.expectOne(`${environment.apiPokemosBase}pokemon?limit=100000&offset=0`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should get Pokémon names by search term', () => {
    const dummyNames = ['pikachu', 'bulbasaur'];
    service['pokemonNamesCache$'].next(dummyNames);

    service.getPokemonNames('pi').subscribe(names => {
      expect(names).toEqual(['pikachu']);
    });
  });

  it('should get Pokémon details', () => {
    const dummyDetails = MOCK_POKEMON_DETAILS
    const dummyPokemon = MOCK_POKEMON

    service.getDetailsPokemon(dummyPokemon).subscribe(details => {
      expect(details).toEqual(dummyDetails);
    });

    const req = httpMock.expectOne(`${environment.apiPokemosBase}pokemon/pikachu`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyDetails);
  });

});
