import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
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
import { Subscription } from 'rxjs';

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
export class LeftPanelComponent implements OnInit, OnDestroy {
  private readonly spotifyService = inject(SpotifyService);
  private readonly router = inject(Router);

  selectedMenu = signal<string>('Home');
  playlists = signal<IPlaylist[]>([]);

  subs: Subscription[] = [];

  // Icons
  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playlistIcon = faMusic;

  ngOnInit(): void {
    this.getPlaylists();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  clickButton(button: string) {
    this.selectedMenu.set(button);
    this.router.navigateByUrl('player/home');
  }

  getPlaylists() {
    const sub = this.spotifyService.getUserPlaylist().subscribe((playlists) => {
      this.playlists.set(playlists);
    });

    this.subs.push(sub);
  }

  goToPlaylist(playlistId: string) {
    this.selectedMenu.set(playlistId);
    this.router.navigateByUrl(`player/list/playlist/${playlistId}`);
  }
}
