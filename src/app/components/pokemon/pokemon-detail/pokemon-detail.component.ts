import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { Subject, combineLatest, takeUntil } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  
  private componentDestroyed: Subject<void> = new Subject();
  public pokemon: any;
  public pokemonTypes: string[];
  public pokemonMoves: string[];
  
  constructor(private route: ActivatedRoute, private store: Store<fromApp.AppState>) {}

  ngOnInit() {

    combineLatest([this.route.params,this.store.select('pokemons')])
    .pipe(
      takeUntil(this.componentDestroyed),
    )
    .subscribe(([pokemon, allPokemons]) => {
      this.pokemon = allPokemons.pokemons.find(pk => pk.name === pokemon['pokemonUrl']) 
      this.pokemonTypes = this.pokemon.types.map((type: any) => type.type.name);
      this.pokemonMoves = this.pokemon.moves.map((move: any) => move.move.name).slice(0,5);
    })
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}

