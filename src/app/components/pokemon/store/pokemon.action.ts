import { createAction, props } from '@ngrx/store';

export const setPokemons = createAction(
    '[Pokemon] Set Pokemons',
    props<{ pokemons: any[] }>()
  );