import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subject,
  debounceTime,
  map,
  startWith,
  takeUntil,
} from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SocialMediaDialogComponent } from 'src/app/shared/dialog/social-media-dialog.component';

/* export interface PokemonGroup {
  letter: string;
  names: string[];
} */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  pokemonNames: string[];
  formControl = new FormControl();
  componentDestroyed: Subject<void> = new Subject();
  filteredPokemons: Observable<string[]>;
  socialUser: SocialUser;
  isLoggedin: boolean;
  dialogRef: MatDialogRef<SocialMediaDialogComponent, any>;
  arrowState: string = 'down';
  // pokemonGroup: PokemonGroup[] = [];

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    /* Checks if clicked outside the span containing the arros. 
    If there's another span element higher up in the DOM hierarchy, and a click occurs within an area inside that span, 
    the closest method would find the nearest span instead of the one you're looking for. In this case, the code might not work as expected.
    To address this situation, you can modify the logic to search for the nearest ancestor that is a span with a specific class or some other unique identifier.  
    (event.target as HTMLElement).closest('span.my-arrow-span');
    */
    const isClickedOutside = !(event.target as HTMLElement).closest('span');

    if (isClickedOutside) {
      // Cambia el estado al hacer clic fuera del span
      this.arrowState = 'down';
    }
  }

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private socialAuthService: SocialAuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPokemonNames();
    this.filteredPokemons = this.formControl.valueChanges.pipe(
      debounceTime(500),
      startWith(''),
      map((value) => this.filter(value))
    );

    this.socialAuthService.authState
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((user) => {
        this.socialUser = user;
        this.isLoggedin = user != null;
        if (this.isLoggedin) {
          this.dialogRef.close();
        }
      });
  }

  private filter(value: string): string[] {
    const formattedValue = value.toLocaleLowerCase();
    return this.pokemonNames.filter(
      (name) => name.toLocaleLowerCase().indexOf(formattedValue) === 0
    );
  }

  public getPokemonNames(): void {
    this.store.select('pokemons').subscribe((allPokemons) => {
      this.pokemonNames = allPokemons.pokemons.map((pk) => pk.name);
      //this.pokemonGroup = this.groupPokemons(this.pokemonNames); TODO add grouping funcionality
    });
  }

  public onGoToPokemon(input: HTMLInputElement): void {
    this.router.navigate(['pokemons', input.value]);
    this.formControl.setValue('');
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }

  openSocialMediProviderDialog(): void {
    this.dialogRef = this.dialog.open(SocialMediaDialogComponent);
  }

  toggleArrow() {
    this.arrowState = this.arrowState === 'down' ? 'up' : 'down';
  }

  ngOnDestroy(): void {
    if (this.isLoggedin) {
      this.signOut();
    }
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
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
