import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { CartService } from '../../features/cart/data-access/cart.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterLink, CommonModule]
})
export class HeaderComponent {
  private readonly oidcService = inject(OidcSecurityService);
  private readonly cartService = inject(CartService);

  readonly title = signal('MicroserviceGridShop');

  isAuthenticated = signal(false);
  username = signal('');
  roles = signal<string[]>([]);
  rolesReady = signal(false);

  cartCount = computed(() =>
    this.cartService.cart().reduce((sum, item) => sum + item.quantity, 0)
  );

  isAdmin = computed(() => this.roles().includes('ADMIN'));
  isClient = computed(() => this.roles().includes('CLIENT'));

  constructor() {
    /** AUTH STATUS */
    this.oidcService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated.set(isAuthenticated);
    });

    /** USER DATA */
    this.oidcService.userData$.subscribe(d => {
      if (!d?.userData) return;
      this.username.set(d.userData.preferred_username || d.userData.given_name || '');
    });

    /** ROLES FROM TOKEN */
    this.oidcService.getAccessToken().pipe(first()).subscribe(token => {
      if (!token) return;

      const payload = JSON.parse(atob(token.split('.')[1]));
      const tokenRoles = payload?.realm_access?.roles ?? [];

      this.roles.set(tokenRoles);
      this.rolesReady.set(true);
      console.log('Token roles:', tokenRoles);
    });
  }

  login() {
    this.oidcService.authorize();
  }

  logout() {
    this.oidcService.logoff().subscribe();
  }
}
