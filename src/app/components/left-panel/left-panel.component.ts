import { Component, inject, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-left-panel',
  imports: [MenuButtonComponent, FontAwesomeModule, CommonModule],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.scss',
})
export class LeftPanelComponent implements OnInit {

  private readonly spotifyService = inject(SpotifyService);

  selectedMenu: string = 'Home';
  playlists: IPlaylist[] = [];

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
  }

  async getPlaylists() {
    this.playlists = await this.spotifyService.getUserPlaylist();
    console.log(this.playlists);
  }
}
