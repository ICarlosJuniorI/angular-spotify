import { Component, inject, OnInit, signal } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { IArtist } from '../../interfaces/IArtist';
import { newArtist } from '../../common/factories';
import { take } from 'rxjs';

@Component({
  selector: 'app-top-artist',
  imports: [],
  templateUrl: './top-artist.component.html',
  styleUrl: './top-artist.component.scss',
})
export class TopArtistComponent implements OnInit {
  artist = signal<IArtist>(newArtist());

  private readonly spotifyService = inject(SpotifyService);

  ngOnInit(): void {
    this.getArtists();
  }

  getArtists() {
    this.spotifyService
      .getTopArtists(1)
      .pipe(take(1))
      .subscribe({
        next: (artists: IArtist[]) => {
          if (artists && artists.length > 0) {
            this.artist.set(artists[0]);
          }
        },
        error: (err) => {
          console.error('Failed to fetch top artist:', err);
        },
      });
  }
}
