import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartService = inject(CartService);
  orderService = inject(OrderService);
  oidcService = inject(OidcSecurityService);

  isCreating = false;

  createOrder() {
    if (this.cartService.cart().length === 0) return;

    this.isCreating = true;

    this.oidcService.userData$
      .pipe(take(1))
      .subscribe(userData => {

        const userId = userData?.userData?.sub;
        if (!userId) {
          alert('User not authenticated');
          this.isCreating = false;
          return;
        }

        const order = {
          userId,
          items: this.cartService.cart(),
          total: this.cartService.cartTotal()
        };

        this.orderService.createOrder(order).subscribe({
          next: () => {
            alert('Order created ✅');
            this.cartService.clearCart();
            this.isCreating = false;
          },
          error: err => {
            console.error(err);
            alert('Failed to create order');
            this.isCreating = false;
          }
        });
      });
  }
}
