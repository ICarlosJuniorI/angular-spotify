import { Component } from '@angular/core';
import { TopArtistsComponent } from "../../components/top-artists/top-artists.component";

@Component({
  selector: 'app-home',
  imports: [TopArtistsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
