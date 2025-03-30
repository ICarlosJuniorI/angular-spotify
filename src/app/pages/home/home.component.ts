import { Component, inject, OnInit, signal } from '@angular/core';
import { TopArtistsComponent } from '../../components/top-artists/top-artists.component';
import { RightPanelComponent } from '../../components/right-panel/right-panel.component';
import { IMusic } from '../../interfaces/IMusic';
import { SpotifyService } from '../../services/spotify.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  imports: [TopArtistsComponent, RightPanelComponent, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  musics = signal<IMusic[]>([]);

  // Icons
  playIcon = faPlay;

  private readonly spotifyService = inject(SpotifyService);

  ngOnInit(): void {
    this.getMusics();
  }

  getMusics() {
    this.spotifyService.getMusics().subscribe((response) => {
      this.musics.set(response);
    });
  }

  getArtists(music: IMusic) {
    return music.artists.map((artist) => artist.name).join(', ');
  }


  playMusic(music: IMusic) {
    this.spotifyService.playMusic(music.id);
  }
}
