import { Component } from '@angular/core';
import { LeftPanelComponent } from '../../components/left-panel/left-panel.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-player',
  imports: [LeftPanelComponent, RouterModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {}
