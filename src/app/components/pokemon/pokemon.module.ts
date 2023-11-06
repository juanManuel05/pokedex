import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    PokemonDetailComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
  ]
})
export class PokemonModule { }
