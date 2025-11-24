import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  readonly welcomeMessage = signal('Welcome to MicroserviceGridShop!');
}

