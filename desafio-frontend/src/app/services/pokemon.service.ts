import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {Pokemon, PokemonListResponse} from "../model/Pokemon";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = environment.apiPokemosBase;

  constructor(private http: HttpClient) {}

  getPokemon(name: string): Observable<Pokemon | null> {
    if (!name.trim()) {
      return of(null);
    }

    const url = `${this.apiUrl}pokemon/${name.toLowerCase()}`;

    return this.http
      .get<Pokemon>(url)
      .pipe(
        catchError(
          error => {
            console.error('Erro ao buscar Pokémon:', error);
            return of(null);
          })
      );
  }

  // TODO: toda vez que chama getPokemonNames, ele faz uma requisição para buscar todos os pokemons
  // e depois filtra. Poderiamos fazer um cache para não precisar buscar todos os pokemons toda vez

  getAllPokemonNames(): Observable<any[] | string[]> {
    const url = `${this.apiUrl}pokemon?limit=100000&offset=0`;

    return this.http.get<PokemonListResponse>(url).pipe(
      map(response => response.results.map(pokemon => pokemon.name)),
      catchError(error => {
        console.error('Erro ao buscar nomes de Pokémons:', error);
        return of([]);
      })
    );
  }

  getPokemonNames(searchTerm: string = '', limit = 5): Observable<string[]> {
    if (!searchTerm) {
      return of([]);
    }

    const searchTermLower = searchTerm.toLowerCase();

    return this.getAllPokemonNames().pipe(
      map((pokemonNames: string[]) => pokemonNames
        .filter(name => name.toLowerCase().includes(searchTermLower))
        .slice(0, limit)
      )
    );
  }
}
