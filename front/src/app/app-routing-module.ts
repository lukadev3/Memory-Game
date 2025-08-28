import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { Game } from './components/game/game';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { GuestGuard } from './services/guest-guard';
import { AuthGuard } from './services/auth-guard';
import { Profile } from './components/profile/profile';
import { Leaderboard } from './components/leaderboard/leaderboard';

const routes: Routes = [
  {
    path: '',
    component: Login,
    pathMatch: 'full'
  },
  {
    path: 'register',
    canActivate: [GuestGuard],
    component: Register
  },
  {
    path: 'login',
    canActivate: [GuestGuard],
    component: Login
  },
  {
    path: 'game',
    canActivate: [AuthGuard],
    component: Game
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: Profile
  },
  {
    path: 'leaderboard',
    component: Leaderboard
  },
  {
    path: '**',
    component: PageNotFound
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
