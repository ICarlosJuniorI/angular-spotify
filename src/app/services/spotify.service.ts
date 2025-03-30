import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { SpotifyConfiguration } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import Spotify from 'spotify-web-api-js';
import { IUser } from '../interfaces/IUser';
import {
  SpotifyArtistToArtist,
  SpotifyPlaylistToPlaylist,
  SpotifyTrackToMusic,
  SpotifyUserToUser,
} from '../common/spotifyHelper';
import { IPlaylist } from '../interfaces/IPlaylist';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IArtist } from '../interfaces/IArtist';
import { IMusic } from '../interfaces/IMusic';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  spotifyApi!: Spotify.SpotifyWebApiJs;
  user!: IUser;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  constructor() {
    this.spotifyApi = new Spotify();
  }

  async loadUser() {
    if (this.user) return true;

    const token = localStorage.getItem('spotifyToken');

    if (!token) return false;

    try {
      this.defineAccessToken(token);
      await this.getSpotifyUser();
      return !!this.user;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getSpotifyUser() {
    const userInfo = await this.spotifyApi.getMe();
    this.user = SpotifyUserToUser(userInfo);
  }

  getUserPlaylist(offset = 0, limit = 50): Observable<IPlaylist[]> {
    return new Observable<IPlaylist[]>((observer) => {
      this.spotifyApi
        .getUserPlaylists(this.user.id, {
          offset,
          limit,
        })
        .then((response) => {
          const playlists = response.items.map(SpotifyPlaylistToPlaylist);
          observer.next(playlists);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getTopArtists(limit: number = 10): Observable<IArtist[]> {
    return new Observable<IArtist[]>((observer) => {
      this.spotifyApi
        .getMyTopArtists({ limit })
        .then((response) => {
          const artists = response.items.map(SpotifyArtistToArtist);
          observer.next(artists);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getMusics(offset: number = 0, limit: number = 50): Observable<IMusic[]> {
    return new Observable<IMusic[]>((observer) => {
      this.spotifyApi
        .getMySavedTracks({ offset, limit })
        .then((response) => {
          const musics = response.items.map((item) =>
            SpotifyTrackToMusic(item.track)
          );
          observer.next(musics);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  playMusic(musicId: string) {
    this.spotifyApi.queue(musicId);
    this.spotifyApi.skipToNext();
  }

  getLoginUrl() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  getTokenUrlCallback() {
    if (isPlatformBrowser(this.platformId)) {
      if (!window.location.hash) {
        return '';
      }

      const params = window.location.hash.substring(1).split('&');

      // Pega a posição 0, quebra no '=' e retorna a posição 1
      return params[0].split('=')[1];
    }

    return '';
  }

  defineAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('spotifyToken', token);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
