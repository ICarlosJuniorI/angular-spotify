import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { IMusic } from '../../interfaces/IMusic';
import { newMusic } from '../../common/factories';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';
import { BannerComponent } from '../../components/banner/banner.component';
import { RightPanelComponent } from '../../components/right-panel/right-panel.component';
import { PlayerService } from '../../services/player.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-music-list',
  imports: [BannerComponent, RightPanelComponent, FontAwesomeModule],
  templateUrl: './music-list.component.html',
  styleUrl: './music-list.component.scss',
})
export class MusicListComponent implements OnInit, OnDestroy {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly spotifyService = inject(SpotifyService);
  private readonly playerService = inject(PlayerService);

  destroy$ = new Subject<void>();
  musics = signal<IMusic[]>([]);
  currentMusic = signal<IMusic>(newMusic());

  bannerImageUrl = signal<string>('');
  bannerText = signal<string>('');
  title = signal<string>('');

  // Icons
  playIcon = faPlay;

  ngOnInit(): void {
    this.getMusics();
    this.getCurrentMusic();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getMusics() {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (params) => {
        const type = params.get('type');
        const id = params.get('id');
        this.getPageData(type!, id!);
      });
  }

  getPageData(type: string, id: string) {
    if (type === 'playlist') {
      this.getPlaylistData(id);
    } else {
      this.getArtistData(id);
    }
  }

  getPlaylistData(playlistId: string) {
    this.spotifyService
      .getPlaylistMusics(playlistId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        if (response) {
          this.setPageData(
            response.name,
            response.imageUrl,
            response.musics ?? []
          );
          this.title.set(`Músicas Playlist: ${response.name}`);
        }
      });
  }

  getCurrentMusic() {
    this.playerService.currentMusic.pipe(takeUntil(this.destroy$)).subscribe({
      next: (music) => {
        this.currentMusic.set(music);
      },
      error: (err) => {
        console.error('Failed to fetch current music:', err);
      },
    });
  }

  getArtistData(artistId: string) {}

  setPageData(bannerText: string, bannerImage: string, musics: IMusic[]) {
    this.bannerImageUrl.set(bannerImage);
    this.bannerText.set(bannerText);
    this.musics.set(musics);
  }

  playMusic(music: IMusic) {
    this.spotifyService.playMusic(music.id);
    this.playerService.setCurrentMusic(music);
  }

  getArtists(music: IMusic) {
    return music.artists.map((artist) => artist.name).join(', ');
  }
}
