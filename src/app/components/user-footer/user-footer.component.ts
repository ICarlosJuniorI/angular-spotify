import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { IUser } from '../../interfaces/IUser';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-user-footer',
  imports: [FontAwesomeModule],
  templateUrl: './user-footer.component.html',
  styleUrl: './user-footer.component.scss',
})
export class UserFooterComponent implements OnInit {
  exitIcon = faSignOutAlt;
  user!: IUser;

  private readonly spotifyService = inject(SpotifyService);

  ngOnInit(): void {
    this.user = this.spotifyService.user;
  }

  logout() {
    this.spotifyService.logout();
  }
}
