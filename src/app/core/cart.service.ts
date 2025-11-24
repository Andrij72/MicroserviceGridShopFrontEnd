import { Injectable, signal } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  cart = signal<CartItem[]>([]);

  addToCart(product: Omit<CartItem, 'quantity'>) {
    const items = this.cart();
    const existing = items.find(item => item.id === product.id);

    if (existing) {
      existing.quantity++;
      this.cart.set([...items]);
    } else {
      this.cart.set([...items, { ...product, quantity: 1 }]);
    }
  }

  removeItem(id: number) {
    this.cart.set(this.cart().filter(item => item.id !== id));
  }

  clearCart() {
    this.cart.set([]);
  }
}
