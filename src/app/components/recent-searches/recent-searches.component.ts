import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-recent-searches',
  imports: [FormsModule],
  templateUrl: './recent-searches.component.html',
  styleUrl: './recent-searches.component.scss',
})
export class RecentSearchesComponent {
  recentSearches = [
    'Top Brasil',
    'Top Global',
    'Esquenta Sertanejo',
    'Funk Hits',
    'Pagodeira',
  ];

  private readonly spotifyService = inject(SpotifyService);

  searchField = signal<string>('');

  setSearchInput(search: string) {
    this.searchField.set(search);
  }

  startSearch() {
    console.log('Pesquisou')
  }
}
