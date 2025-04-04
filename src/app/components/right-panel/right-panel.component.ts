import { Component } from '@angular/core';
import { RecentSearchesComponent } from '../recent-searches/recent-searches.component';
import { TopArtistsComponent } from '../top-artists/top-artists.component';
import { PlayerCardComponent } from "../player-card/player-card.component";

@Component({
  selector: 'app-right-panel',
  imports: [RecentSearchesComponent, TopArtistsComponent, PlayerCardComponent],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.scss',
})
export class RightPanelComponent {}
