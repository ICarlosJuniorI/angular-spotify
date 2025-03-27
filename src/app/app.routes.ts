import { Routes } from '@angular/router';
import { authenticatedGuard } from './guards/authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'player',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'player',
    loadComponent: () =>
      import('./pages/player/player.component').then((m) => m.PlayerComponent),
    canMatch: [authenticatedGuard],
  },
];
