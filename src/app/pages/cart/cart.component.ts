import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartService} from '../../core/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CartComponent {

  constructor(public cart: CartService) {

  }

  remove(id: number) {
    this.cart.removeItem(id);
  }

  clear() {
    this.cart.clearCart();
  }

  get total() {
    return this.cart.cart().reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
