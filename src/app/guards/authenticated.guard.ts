import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

export const authenticatedGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const spotifyService = inject(SpotifyService);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('spotifyToken');

    if (!token) {
      return notAuthenticated();
    }
  }

  function notAuthenticated() {
    if (isPlatformBrowser(platformId)) {
      localStorage.clear();
    }
    router.navigate(['/login']);
    return false;
  }

  return new Promise((res) => {
    spotifyService
      .loadUser()
      .then((userCreated) => {
        if (userCreated) {
          res(true);
        } else {
          res(notAuthenticated());
        }
      })
      .catch(() => {
        res(notAuthenticated());
      });
  });
};
