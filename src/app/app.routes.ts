import { Routes } from '@angular/router';
import { authenticatedGuard } from './guards/authenticated.guard';
import { HomeComponent } from './pages/home/home.component';
import { MusicListComponent } from './pages/music-list/music-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'player',
    pathMatch: 'full',
  },
  // Login routes
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  // Player routes
  {
    path: 'player',
    loadComponent: () =>
      import('./pages/player/player.component').then((m) => m.PlayerComponent),
    canMatch: [authenticatedGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'list/:type/:id',
        component: MusicListComponent,
      },
    ],
  },
];
