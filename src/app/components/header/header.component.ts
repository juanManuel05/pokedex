import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest, debounceTime, map, startWith, takeUntil } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Router } from '@angular/router';

/* export interface PokemonGroup {
  letter: string;
  names: string[];
} */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  public pokemonNames: string[];
  formControl = new FormControl();
  private componentDestroyed: Subject<void> = new Subject();
  filteredPokemons: Observable<string[]>;
  // pokemonGroup: PokemonGroup[] = [];
  constructor(private store: Store<fromApp.AppState>, private router: Router){}

  ngOnInit(): void {
    this.getPokemonNames();
    this.filteredPokemons = this.formControl.valueChanges.pipe(
      debounceTime(500),
      startWith(''),
      map(value => this.filter(value))
    );
  }
  private filter(value: string): string[] {
    const formattedValue = value.toLocaleLowerCase();
    return this.pokemonNames.filter(name => name.toLocaleLowerCase().indexOf(formattedValue) === 0);

  }

  public getPokemonNames(): void {
    this.store.select('pokemons')
      .subscribe(
        (allPokemons) => {
        this.pokemonNames = allPokemons.pokemons.map((pk) => pk.name)
        //this.pokemonGroup = this.groupPokemons(this.pokemonNames); TODO add grouping funcionality
        } 

    )
  }

  public onGoToPokemon(input: HTMLInputElement):void {
    this.router.navigate(['pokemons',input.value]);
    this.formControl.setValue('');
  }

  /* groupPokemons(pokemons:any): PokemonGroup[] {
    const binned = pokemons.reduce((result:any, pokemon:any) => {
      // get the first letter. (this assumes no empty words in the list)
      const letter = pokemon[0];
      
      // ensure the result has an entry for this letter
      result[letter] = result[letter] || [];
      
      // add the word to the letter index
      result[letter].push(pokemon);
      
      // return the updated result
      return result;
    }, {})
    const obj = binned;
    return Object.entries(obj).map((e) => ( { letter: e[0], names: e[1] } )) as PokemonGroup[] ; 
  } */

}
