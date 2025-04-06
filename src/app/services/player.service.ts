import { inject, Injectable, OnDestroy } from '@angular/core';
import { IMusic } from '../interfaces/IMusic';
import { newMusic } from '../common/factories';
import {
  BehaviorSubject,
  catchError,
  interval,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService implements OnDestroy {
  private readonly spotifyService = inject(SpotifyService);

  currentMusic = new BehaviorSubject<IMusic>(newMusic());
  timerId: any = null;

  private readonly destroy$ = new Subject<void>();

  constructor() {
    this.getCurrentMusic();
  }

  private getCurrentMusic() {
    interval(3000)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.spotifyService.getCurrentMusic()),
        catchError((err) => {
          console.error('Failed to fetch current music:', err);
          return [];
        })
      )
      .subscribe((music: IMusic) => {
        this.setCurrentMusic(music);
      });
  }

  setCurrentMusic(music: IMusic) {
    this.currentMusic.next(music);
  }

  play() {
    this.spotifyService.play();
  }

  pause() {
    this.spotifyService.pause();
  }

  skipToPrevious() {
    this.spotifyService.skipToPrevious();
  }

  skipToNext() {
    this.spotifyService.skipToNext();
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Encerra o fluxo reativo
    this.destroy$.complete();
  }
}
