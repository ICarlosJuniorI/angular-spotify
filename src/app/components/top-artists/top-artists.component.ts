import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ArtistItemImageComponent } from '../artist-item-image/artist-item-image.component';
import { SpotifyService } from '../../services/spotify.service';
import { IArtist } from '../../interfaces/IArtist';
import { catchError, of, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-top-artists',
  imports: [ArtistItemImageComponent],
  templateUrl: './top-artists.component.html',
  styleUrl: './top-artists.component.scss',
})
export class TopArtistsComponent implements OnInit, OnDestroy {
  private readonly spotifyService = inject(SpotifyService);
  private readonly destroy$ = new Subject<void>();

  artists = signal<IArtist[]>([]);

  ngOnInit(): void {
    this.getTopArtists();
  }

  getTopArtists(): void {
    this.spotifyService
      .getTopArtists(5)
      .pipe(
        takeUntil(this.destroy$), // Cancela a assinatura ao destruir o componente
        tap((response: IArtist[]) => {
          this.artists.set(response);
        }),
        catchError((error) => {
          console.error('Failed to fetch top artists:', error);
          return of([]);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
