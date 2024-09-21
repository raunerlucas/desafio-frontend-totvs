import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Pokemon} from "../model/Pokemon";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = environment.apiPokemosBase;

  constructor(private http: HttpClient) {
  }

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
}
