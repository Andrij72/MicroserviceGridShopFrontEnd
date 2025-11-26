import { Component, inject, computed } from '@angular/core';
import { CartService } from '../../core/cart.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
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

  isAuthenticated = toSignal(
    this.oidcService.isAuthenticated$.pipe(map(d => d.isAuthenticated)),
    { initialValue: false } // для тесту можна true
  );

  username = toSignal(
    this.oidcService.userData$.pipe(
      map(d => d.userData?.preferred_username || '')
    ),
    { initialValue: '' }
  );

  cartCount = computed(() =>
    this.cartService.cart().reduce((sum, item) => sum + item.quantity, 0)
  );

  login() { this.oidcService.authorize(); }
  logout() { this.oidcService.logoff().subscribe(); }
}
