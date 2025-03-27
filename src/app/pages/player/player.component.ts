import { Component } from '@angular/core';
import { LeftPanelComponent } from '../../components/left-panel/left-panel.component';

@Component({
  selector: 'app-player',
  imports: [LeftPanelComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {}
