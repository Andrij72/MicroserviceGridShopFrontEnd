import {Component, computed, inject} from '@angular/core';
import {CartService} from '../../order/data-access/cart.service';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [RouterLink, CommonModule]
})
export class Home {
  private readonly cartService = inject(CartService);
  private readonly oidcService = inject(OidcSecurityService);

  isAuthenticated = toSignal(
    this.oidcService.isAuthenticated$.pipe(map(d => d.isAuthenticated)),
    { initialValue: false }
  );

  cartCount = computed(() =>
    this.cartService.cart().reduce((sum, item) => sum + item.quantity, 0)
  );

  start() {
    this.oidcService.authorize();
  }

}
