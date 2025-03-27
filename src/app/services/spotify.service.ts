import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { SpotifyConfiguration } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import Spotify from 'spotify-web-api-js';
import { IUser } from '../interfaces/IUser';
import {
  SpotifyPlaylistToPlaylist,
  SpotifyUserToUser,
} from '../common/spotifyHelper';
import { IPlaylist } from '../interfaces/IPlaylist';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  spotifyApi!: Spotify.SpotifyWebApiJs;
  user!: IUser;

  private readonly platformId = inject(PLATFORM_ID);

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

  async getUserPlaylist(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.user.id, {
      offset,
      limit,
    });
    return playlists.items.map(SpotifyPlaylistToPlaylist);
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
}
