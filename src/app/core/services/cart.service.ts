import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  cart = signal<CartItem[]>([]);

  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  open() {
    this.isOpenSubject.next(true);
  }

  close() {
    this.isOpenSubject.next(false);
  }

  toggle() {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }

  addToCart(product: Omit<CartItem, 'quantity'>) {
    const items = this.cart();
    const existing = items.find(p => p.id === product.id);

    if (existing) {
      existing.quantity++;
      this.cart.set([...items]);
    } else {
      this.cart.set([...items, { ...product, quantity: 1 }]);
    }
  }

  removeItem(id: string) {
    this.cart.set(this.cart().filter(item => item.id !== id));
  }

  increase(item: CartItem) {
    item.quantity++;
    this.cart.set([...this.cart()]);
  }

  decrease(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cart.set([...this.cart()]);
    } else {
      this.removeItem(item.id);
    }
  }

  clearCart() {
    this.cart.set([]);
  }

  cartTotal() {
    return this.cart().reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  cartCount() {
    return this.cart().reduce((sum, item) => sum + item.quantity, 0);
  }

}
