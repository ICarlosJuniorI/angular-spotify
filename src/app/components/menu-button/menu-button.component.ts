import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-menu-button',
  imports: [CommonModule],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.scss'
})
export class MenuButtonComponent {
  description = input<string>('');
  selected = input<boolean>(false);
  click = output<void>();

  onClick() {
    this.click.emit();
  }
}
