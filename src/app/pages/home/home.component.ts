import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { TopArtistComponent } from '../../components/top-artist/top-artist.component';
import { RightPanelComponent } from '../../components/right-panel/right-panel.component';
import { IMusic } from '../../interfaces/IMusic';
import { SpotifyService } from '../../services/spotify.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from '../../services/player.service';
import { newMusic } from '../../common/factories';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [TopArtistComponent, RightPanelComponent, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly spotifyService = inject(SpotifyService);
  private readonly playerService = inject(PlayerService);
  private readonly destroy$ = new Subject<void>(); // Gerencia o ciclo de vida do componente

  musics = signal<IMusic[]>([]);
  currentMusic: IMusic = newMusic();

  // Icons
  playIcon = faPlay;

  ngOnInit(): void {
    this.getMusics();
    this.getCurrentMusic();
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Emite um valor para encerrar as assinaturas
    this.destroy$.complete(); // Completa o Subject
  }

  getMusics() {
    this.spotifyService
      .getMusics()
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.musics.set(response);
        },
        error: (err) => {
          console.error('Failed to fetch musics:', err);
        },
      });
  }

  getCurrentMusic() {
    this.playerService.currentMusic
      .pipe(takeUntil(this.destroy$)) // Encerra a assinatura automaticamente no destroy
      .subscribe({
        next: (music) => {
          this.currentMusic = music;
        },
        error: (err) => {
          console.error('Failed to fetch current music:', err);
        },
      });
  }

  getArtists(music: IMusic) {
    return music.artists.map((artist) => artist.name).join(', ');
  }

  playMusic(music: IMusic) {
    this.spotifyService.playMusic(music.id);
    this.playerService.setCurrentMusic(music);
  }
}
