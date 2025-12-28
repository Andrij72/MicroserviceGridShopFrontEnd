import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../data-access/cart.service';
import { OrderService } from '../../orders/data-access/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule, // <- додати для *ngIf, *ngFor
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

  async checkout() {
    try {
      await this.orderService.createOrder(this.cart());
      alert('Order created!');
      this.cartService.clear();
    } catch (e) {
      console.error(e);
      alert('Error creating order');
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
