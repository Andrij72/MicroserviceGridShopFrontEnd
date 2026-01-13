import {Component, inject, signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {delay, filter, first} from 'rxjs/operators';
import {HeaderComponent} from './core/layout/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
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
        this.router.navigate(['/admin/products']).catch(err => console.error(err));
      } else {
        console.log('User is CLIENT');
        this.router.navigate(['/products']).catch(err => console.error(err));
      }
    });
  }
}
