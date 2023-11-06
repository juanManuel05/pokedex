import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil, switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { DataService } from 'src/app/shared/services/data-service.service';
import * as PokemonActions from '../store/pokemon.action';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { PokemonItem, Pokemons } from 'src/app/shared/models/pokemons.interface';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, OnDestroy {

  private componentDestroyed: Subject<void> = new Subject();
  public pokemons: any[] = [];
  public currentPage = 1;
 

  constructor(private dataService: DataService, private store: Store<fromApp.AppState>, private loadingService: LoadingService){}

  ngOnInit(): void {
    this.getPokemons(150);
  }

  getPokemons(limit: number,offset?: number): void {
    this.loadingService.loadingOn();
    this.dataService.getAllPokemons(limit,offset)
      .pipe(
        takeUntil(this.componentDestroyed),
        switchMap((response:Pokemons) => {
          const pokemonStreams = response.results.map(
            (result:PokemonItem) => this.dataService.getPokemonInfo(result.name)
          );
        return combineLatest([...pokemonStreams]);
        })
      ).subscribe((pokemonData:any) => {
        this.loadingService.loadingOff()
        this.pokemons = pokemonData;
        this.store.dispatch(PokemonActions.setPokemons({ pokemons:this.pokemons }));
      });
  }

  onPageChange(event:any): void {
    this.currentPage = event;
  }
  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}