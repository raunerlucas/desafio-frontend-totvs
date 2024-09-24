export interface PokemonModel {
  name: string;
  sprites: {
    front_default: string;
  };
}

export interface PokemonListResponse {
  count: number;
  next: string;
  previous: string | null;
  results: { name: string; url: string }[];
}
