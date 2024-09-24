import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, of, tap} from "rxjs";
import {PokemonListResponse, PokemonModel} from "../model/pokemon.model";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = environment.apiPokemosBase;
  private pokemonNamesCache$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {}

  getPokemon(name: string): Observable<PokemonModel | null> {
    if (!name.trim()) {
      return of(null);
    }

    const url = `${this.apiUrl}pokemon/${name.toLowerCase()}`;

    return this.http
      .get<PokemonModel>(url)
      .pipe(
        catchError(
          error => {
            console.error('Erro ao buscar Pokémon:', error);
            return of(null);
          })
      );
  }

  getAllPokemonNames(): Observable<string[]> {
    const url = `${this.apiUrl}pokemon?limit=100000&offset=0`;

    if (this.pokemonNamesCache$.getValue().length === 0) {
      return this.http.get<PokemonListResponse>(url).pipe(
        tap(response => {
          const names = response.results.map(pokemon => pokemon.name);
          this.pokemonNamesCache$.next(names);
        }),
        map(response => response.results.map(pokemon => pokemon.name)),
        catchError(error => {
          console.error('Erro ao buscar nomes de Pokémons:', error);
          return of([]);
        })
      );
    } else {
      return this.pokemonNamesCache$.asObservable();
    }
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
