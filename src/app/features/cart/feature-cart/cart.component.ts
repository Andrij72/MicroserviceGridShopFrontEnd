import {Component, inject} from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {CartService} from '../data-access/cart.service';
import {OrderService} from '../../orders/data-access/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  private cartService = inject(CartService);
  private orderService = inject(OrderService);

  cart = this.cartService.cart;
  total = this.cartService.total;

  public orderError: string | null = null;
  orderSuccess: boolean = false;

  async checkout() {
    try {
      await this.orderService.createOrder(this.cart());
      this.orderSuccess = true;
      this.orderError = null;
      this.cartService.clear();
    } catch (err: any) {
      this.orderError = err?.message ?? 'Order creation failed';
      this.orderSuccess = false;
      setTimeout(() => {
        this.orderError = null;
      }, 10000);

    }
  }

  lineTotal(item: any) {
    return this.cartService.lineTotal(item);
  }

  updateQuantity(sku: string, quantity: number) {
    this.cartService.updateQuantity(sku, +quantity);
  }

  removeItem(sku: string) {
    this.cartService.remove(sku);
  }
}
