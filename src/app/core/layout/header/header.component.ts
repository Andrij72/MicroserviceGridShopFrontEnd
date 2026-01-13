import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { CartService } from '../../../features/cart/data-access/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterLink, CommonModule, RouterLinkActive]
})
export class HeaderComponent {

  private readonly oidcService = inject(OidcSecurityService);
  private readonly cartService = inject(CartService);

  readonly title = signal('MicroserviceGridShop');

  isAuthenticated = signal(false);
  username = signal('');
  roles = signal<string[]>([]);
  rolesReady = signal(false);

  isAdmin = computed(() => this.roles().includes('ADMIN'));
  isClient = computed(() =>
    this.roles().includes('CLIENT') && !this.isAdmin()
  );

  cartCount = computed(() =>
    this.cartService.cart()
      .reduce((sum: number, item) => sum + item.quantity, 0)
  );


  constructor() {
    this.oidcService.isAuthenticated$.subscribe(({ isAuthenticated }) =>
      this.isAuthenticated.set(isAuthenticated)
    );

    this.oidcService.userData$.subscribe(d => {
      if (!d?.userData) return;
      this.username.set(
        d.userData.preferred_username ||
        d.userData.given_name ||
        ''
      );
    });

    this.oidcService.getAccessToken().subscribe(token => {
      if (!token) {
        this.rolesReady.set(true);
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.roles.set(payload?.realm_access?.roles ?? []);
      } catch {
        this.roles.set([]);
      }

      this.rolesReady.set(true);
    });
  }

  login() {
    this.oidcService.authorize();
  }

  logout() {
    this.oidcService.logoff().subscribe();
  }
}
