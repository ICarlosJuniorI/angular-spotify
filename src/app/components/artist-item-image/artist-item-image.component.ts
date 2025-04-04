import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-artist-item-image',
  imports: [],
  templateUrl: './artist-item-image.component.html',
  styleUrl: './artist-item-image.component.scss',
})
export class ArtistItemImageComponent {
  imageSrc = input<string>('');
  click = output<void>();

  onClick() {
    this.click.emit();
  }
}
