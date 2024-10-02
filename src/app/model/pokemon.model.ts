export interface PokemonModel {
  id: number;
  name: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: { type: { name: string } }[];
}

export interface PokemonDetailsModel {
  id: number;
  name: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {
      name: string
    };
  }[];
  abilities: {
    ability: {
      name: string;
    }
  }[];
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
}

export interface PokemonListResponse {
  count: number;
  next: string;
  previous: string | null;
  results: { name: string; url: string }[];
}
