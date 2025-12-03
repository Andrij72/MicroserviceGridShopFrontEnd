import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { filter, first, delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  readonly title = signal('MicroserviceGridShopFrontend');
  readonly isAdmin = signal(false);

  private readonly oidcService = inject(OidcSecurityService);
  private readonly router = inject(Router);

  constructor() {
    this.oidcService.checkAuth()
      .pipe(
        filter(auth => auth.isAuthenticated),
        first(),
        delay(500)
      )
      .subscribe(() => this.handleAuthenticated());
  }

  private handleAuthenticated() {
    console.log('User is authenticated');

    this.oidcService.getAccessToken().pipe(first()).subscribe(token => {
      console.log('Access Token:', token);
    });

    this.oidcService.getIdToken().pipe(first()).subscribe(token => {
      if (!token) return;

      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('ID Token payload:', payload);

      const roles = payload.realm_access?.roles || [];
      console.log('Roles:', roles);

      if (roles.includes('ADMIN')) {
        this.isAdmin.set(true);
        console.log('User is ADMIN');
      } else {
        console.log('User is NOT ADMIN');
      }

      this.router.navigate(['/products']).catch(err => console.error(err));
    });
  }
}
