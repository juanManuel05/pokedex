import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemons } from '../models/pokemons.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
  constructor(private http: HttpClient) { }

  getAllPokemons(limit:number, offset?: number): Observable<Pokemons> {
    return this.http.get<Pokemons>(`${this.baseUrl}?limit=${limit}}&offset=${offset}`);
  }

  /**
   * FYI: As above, create an interface to model the response too. It's the only type left to model
  */
  getPokemonInfo(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${name}`);
  }
}

