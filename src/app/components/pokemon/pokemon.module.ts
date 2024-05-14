import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PokemonDetailComponent, PageNotFoundComponent],
  imports: [FormsModule, CommonModule, PokemonRoutingModule],
})
export class PokemonModule {}
