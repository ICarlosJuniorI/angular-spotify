import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { IMusic } from '../../interfaces/IMusic';
import { newMusic } from '../../common/factories';
import { PlayerService } from '../../services/player.service';
import { Subject, takeUntil } from 'rxjs';
import {
  faPause,
  faPlay,
  faStepBackward,
  faStepForward,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-player-card',
  imports: [FontAwesomeModule],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.scss',
})
export class PlayerCardComponent implements OnInit, OnDestroy {
  private readonly playerService = inject(PlayerService);
  private readonly destroy$ = new Subject<void>();

  music = signal<IMusic>(newMusic());

  // Icons
  previousIcon = faStepBackward;
  nextIcon = faStepForward;
  playIcon = faPlay;
  pauseIcon = faPause;

  ngOnInit(): void {
    this.getCurrentMusic();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCurrentMusic() {
    this.playerService.currentMusic
      .pipe(takeUntil(this.destroy$))
      .subscribe((music) => {
        this.music.set(music);
      });
  }

  play() {
    this.playerService.play();
  }

  pause() {
    this.playerService.pause();
  }

  skipToPrevious() {
    this.playerService.skipToPrevious();
  }

  skipToNext() {
    this.playerService.skipToNext();
  }
}
