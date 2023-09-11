import { ActionReducerMap } from '@ngrx/store';
import * as fromPokemons from '../components/pokemon/store/pokemon.reducer';


export interface AppState {
  pokemons: fromPokemons.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  pokemons: fromPokemons.pokemonReducer
};