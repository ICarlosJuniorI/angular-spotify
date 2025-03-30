import { Component, inject, OnInit, signal } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { IArtist } from '../../interfaces/IArtist';
import { newArtist } from '../../common/factories';

@Component({
  selector: 'app-top-artists',
  imports: [],
  templateUrl: './top-artists.component.html',
  styleUrl: './top-artists.component.scss',
})
export class TopArtistsComponent implements OnInit {
  // artist: IArtist = newArtist();
  artist = signal<IArtist>(newArtist());

  private readonly spotifyService = inject(SpotifyService);

  ngOnInit(): void {
    this.getArtists();
  }

  getArtists() {
    this.spotifyService.getTopArtists(1).subscribe((artists: IArtist[]) => {
      if (artists.length > 0) {
        this.artist.set(artists[0]);
      }
    });
  }
}
