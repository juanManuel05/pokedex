import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleSigninButtonModule,
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PokemonListComponent } from './components/pokemon/pokemon-list/pokemon-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import * as fromApp from './store/app.reducer';
import { StoreModule } from '@ngrx/store';
import { LoadingComponent } from './components/loading/loading.component';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

import { SocialMediaDialogComponent } from './shared/dialog/social-media-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PokemonListComponent,
    LoadingComponent,
    SocialMediaDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    HttpClientModule,
    NgxPaginationModule,
    NoopAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '251043076776-5tl9eg69q6drv7hpdb1ir1lp88pqmob6.apps.googleusercontent.com'
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
