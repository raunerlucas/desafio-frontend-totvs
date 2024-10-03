import {PokemonModel} from '../model/pokemon.model';
import {PokemonDetailsModel} from '../model/pokemonDetails.model';
import {PokemonListResponse} from "../model/pokemonListResponse.model";

export const MOCK_POKEMON: PokemonModel = {
  id: 25,
  name: 'pikachu',
  sprites: {
    other: {
      'dream_world': { front_default: 'https://example.com/pikachu-dream.png' },
      'official-artwork': { front_default: 'https://example.com/pikachu-official.png' }
    }
  },
  types: [{ type: { name: 'electric' } }]
};

export const MOCK_POKEMON_DETAILS: PokemonDetailsModel = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  sprites: {
    other: {
      dream_world: { front_default: 'https://example.com/pikachu-dream.png' },
      "official-artwork": { front_default: 'https://example.com/pikachu-official.png' }
    }
  },
  types: [{ type: { name: 'electric' } }],
  abilities: [{ ability: { name: 'static' } }],
  stats: [{ 'base_stat': 25, 'stat': { 'name': 'hp' } }],
  moves: [{ move: { name: 'thunder-shock', url: '' } }]
};

export const MOCK_POKEMON_LIST_RESPONSE: PokemonListResponse = {
  count: 1118,
  next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  previous: null,
  results: [{name: 'pikachu', url: ""}, {name: 'bulbasaur', url: ""}]
};
