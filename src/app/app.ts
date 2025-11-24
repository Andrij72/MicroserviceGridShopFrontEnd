import {RouterOutlet} from '@angular/router';
import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class App {
  readonly title = signal('MicroserviceGridShopFrontend');
}
