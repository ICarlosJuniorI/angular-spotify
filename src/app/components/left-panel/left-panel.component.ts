import { Component, inject, OnInit, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faGuitar,
  faHome,
  faMusic,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { MenuButtonComponent } from '../menu-button/menu-button.component';
import { IPlaylist } from '../../interfaces/IPlaylist';
import { SpotifyService } from '../../services/spotify.service';
import { CommonModule } from '@angular/common';
import { UserFooterComponent } from '../user-footer/user-footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-panel',
  imports: [
    MenuButtonComponent,
    FontAwesomeModule,
    CommonModule,
    UserFooterComponent,
  ],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.scss',
})
export class LeftPanelComponent implements OnInit {
  private readonly spotifyService = inject(SpotifyService);
  private readonly router = inject(Router);

  selectedMenu: string = 'Home';
  playlists = signal<IPlaylist[]>([]);

  // Icons
  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playlistIcon = faMusic;

  ngOnInit(): void {
    this.getPlaylists();
  }

  clickButton(button: string) {
    this.selectedMenu = button;
    this.router.navigateByUrl('player/home');
  }

  getPlaylists() {
    this.spotifyService.getUserPlaylist().subscribe((playlists) => {
      this.playlists.set(playlists);
    });
  }
}
