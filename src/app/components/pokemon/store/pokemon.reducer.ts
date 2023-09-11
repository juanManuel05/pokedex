import { createReducer, on } from '@ngrx/store';
import * as PokemonActions from './pokemon.action';

export interface State {
    pokemons: any[];
  }
  
  const initialState: State = {
    pokemons: [],
  };
  
export const pokemonReducer = createReducer(
    initialState,
    on(PokemonActions.setPokemons, (state, action) => {
    return {
    ...state,
    pokemons: [...action.pokemons],
    };
    }),
);

  