import { Component, inject, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private readonly spotifyService = inject(SpotifyService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.checkTokenUrlCallback();
  }

  openLoginPage() {
    window.location.href = this.spotifyService.getLoginUrl();
  }

  checkTokenUrlCallback() {
    const token = this.spotifyService.getTokenUrlCallback();

    if (token) {
      this.spotifyService.defineAccessToken(token);
      this.router.navigate(['/player']);
    }
  }
}
