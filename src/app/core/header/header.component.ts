import { Component, inject, computed, signal } from '@angular/core';
import { CartService } from '../services/cart.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  isAuthenticated = signal(false);
  username = signal('');
  roles = signal<string[]>([]);

  cartCount = computed(() =>
    this.cartService.cart().reduce((sum, item) => sum + item.quantity, 0)
  );

  constructor() {
    this.oidcService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated.set(isAuthenticated);
    });

    this.oidcService.userData$.subscribe(d => {
      const data = d.userData;
      if (data) {
        this.username.set(data.given_name || '');
        this.roles.set(data.realm_access?.roles || []);
      }
    });
  }

  login() { this.oidcService.authorize(); }
  logout() { this.oidcService.logoff().subscribe(); }
  isAdmin() { return this.roles().includes('ADMIN'); }
}
