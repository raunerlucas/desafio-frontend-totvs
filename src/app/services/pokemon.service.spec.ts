import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from "../../environments/environment";
import {PokemonModel} from "../model/pokemon.model";
import {PokemonListResponse} from "../model/pokemonListResponse.model";
import {PokemonDetailsModel} from "../model/pokemonDetails.model";
import {PokemonService} from './pokemon.service';

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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get a Pokémon by name', () => {
    const dummyPokemon: PokemonModel = {
      id: 25,
      name: 'pikachu',
      sprites: {
        other: {
          'dream_world': {front_default: 'https://example.com/pikachu-dream.png'},
          'official-artwork': {front_default: 'https://example.com/pikachu-official.png'}
        }
      },
      types: [{type: {name: 'electric'}}]
    };
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
    const dummyResponse: PokemonListResponse = {
      count: 1118,
      next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
      previous: null,
      results: [{name: 'pikachu', url: ""}, {name: 'bulbasaur', url: ""}]
    };
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
    const dummyDetails: PokemonDetailsModel = {
      id: 25,
      name: 'pikachu',
      height: 4,
      weight: 60,
      sprites: {
        other: {
          'dream_world': { front_default: 'https://example.com/pikachu-dream.png' },
          'official-artwork': { front_default: 'https://example.com/pikachu-official.png' }
        }
      },
      types: [{ type: { name: 'electric' } }],
      abilities: [{ ability: { name: 'static' } }],
      stats: [{'base_stat': 25, 'stat': {'name': 'hp'}}],
      moves: [{move: {name: 'thunder-shock', url: ''}}]
    };
    const dummyPokemon: PokemonModel = {
      id: 25,
      name: 'pikachu',
      sprites: {
        other: {
          'dream_world': {front_default: 'https://example.com/pikachu-dream.png'},
          'official-artwork': {front_default: 'https://example.com/pikachu-official.png'}
        }
      },
      types: [{type: {name: 'electric'}}]
    };

    service.getDetailsPokemon(dummyPokemon).subscribe(details => {
      expect(details).toEqual(dummyDetails);
    });

    const req = httpMock.expectOne(`${environment.apiPokemosBase}pokemon/pikachu`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyDetails);
  });

});
