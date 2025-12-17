import { Component } from '@angular/core';
import { CartService, UserDetails } from '../data-access/cart.service';
import { OrderService } from '../data-access/order.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  userDetails: UserDetails = { email: '', firstName: '', lastName: '' };

  constructor(
    public cartService: CartService,
    private orderService: OrderService,
    private oidcService: OidcSecurityService
  ) {
    this.oidcService.userData$.subscribe(user => {
      if (!user?.userData) return;
      this.userDetails = {
        email: user.userData.email,
        firstName: user.userData.given_name || '',
        lastName: user.userData.family_name || ''
      };
    });
  }

  cart() {
    return this.cartService.cart();
  }

  total() {
    return this.cartService.total();
  }

  createOrder() {
    this.orderService.createOrder(this.userDetails, this.cartService.cart()).subscribe({
      next: res => {
        this.cartService.clear();
        alert('Order created!');
      },
      error: err => console.error(err)
    });
  }

  removeItem(item: any) {
    this.cartService.remove(item);
  }
}
