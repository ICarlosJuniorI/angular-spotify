import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { catchError, from, map, Observable } from 'rxjs';
import Spotify from 'spotify-web-api-js';
import { SpotifyConfiguration } from '../../environments/environment';
import { IUser } from '../interfaces/IUser';
import {
  SpotifyArtistToArtist,
  SpotifyPlaylistToPlaylist,
  SpotifyTrackToMusic,
  SpotifyUserToUser,
} from '../common/spotifyHelper';
import { IPlaylist } from '../interfaces/IPlaylist';
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
    return from(
      this.spotifyApi.getUserPlaylists(this.user.id, { offset, limit })
    ).pipe(
      map((response) => response.items.map(SpotifyPlaylistToPlaylist)),
      catchError((error) => {
        throw error;
      })
    );
  }

  getTopArtists(limit: number = 10): Observable<IArtist[]> {
    return from(this.spotifyApi.getMyTopArtists({ limit })).pipe(
      map((response) => response.items.map(SpotifyArtistToArtist)),
      catchError((error) => {
        throw error;
      })
    );
  }

  getMusics(offset: number = 0, limit: number = 50): Observable<IMusic[]> {
    return from(this.spotifyApi.getMySavedTracks({ offset, limit })).pipe(
      map((response) =>
        response.items.map((item) => SpotifyTrackToMusic(item.track))
      ),
      catchError((error) => {
        throw error;
      })
    );
  }

  getCurrentMusic(): Observable<IMusic> {
    return from(this.spotifyApi.getMyCurrentPlayingTrack()).pipe(
      map((response) => {
        if (response.item) {
          const music = {
            item: response.item,
            isPlaying: response.is_playing
          }
          return SpotifyTrackToMusic(music.item, music.isPlaying);
        }
        throw new Error('No music is currently playing');
      }),
      catchError((error) => {
        console.error('Error fetching current music:', error);
        throw error;
      })
    );
  }

  async playMusic(musicId: string) {
    await this.spotifyApi.queue(musicId);
    await this.spotifyApi.skipToNext();
  }

  play() {
    this.spotifyApi.play();
  }

  pause() {
    this.spotifyApi.pause();
  }

  skipToPrevious() {
    this.spotifyApi.skipToPrevious();
  }

  skipToNext() {
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
