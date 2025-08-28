import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Register } from './components/register/register';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Login } from './components/login/login';
import { Navbar } from './components/navbar/navbar';
import { Game } from './components/game/game';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { Profile } from './components/profile/profile';

@NgModule({
  declarations: [
    App,
    Register,
    Login,
    Navbar,
    Game,
    PageNotFound,
    Profile
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
