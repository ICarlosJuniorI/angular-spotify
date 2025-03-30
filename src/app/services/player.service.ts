import { inject, Injectable } from '@angular/core';
import { IMusic } from '../interfaces/IMusic';
import { newMusic } from '../common/factories';
import { BehaviorSubject } from 'rxjs';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly spotifyService = inject(SpotifyService);

  currentMusic = new BehaviorSubject<IMusic>(newMusic());
  timerId: any = null;

  constructor() {
    this.getCurrentMusic();
  }

  getCurrentMusic() {
    clearTimeout(this.timerId);

    this.spotifyService.getCurrentMusic().subscribe({
      next: (music: IMusic) => {
        this.setCurrentMusic(music);
      },
      error: (err) => {
        console.error('Failed to fetch current music:', err);
      },
    });

    this.timerId = setInterval(() => {
      this.getCurrentMusic();
    }, 3000);
  }

  setCurrentMusic(music: IMusic) {
    this.currentMusic.next(music);
  }
}
