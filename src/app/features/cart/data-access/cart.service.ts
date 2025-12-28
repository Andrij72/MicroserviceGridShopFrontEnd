import {computed, Injectable, signal} from '@angular/core';
import {CartItem} from '../model/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _cart = signal<CartItem[]>([]);
  cart = this._cart.asReadonly();

  addProduct(product: CartItem['product']) {
    this._cart.update(items => {
      const existing = items.find(i => i.product.sku === product.sku);

      if (existing) {
        return items.map(i =>
          i.product.sku === product.sku
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...items, { product, quantity: 1 }];
    });
  }

  updateQuantity(sku: string, quantity: number) {
    this._cart.update(items =>
      items
        .map(i =>
          i.product.sku === sku
            ? { ...i, quantity }
            : i
        )
        .filter(i => i.quantity > 0)
    );
  }

  remove(sku: string) {
    this._cart.update(items =>
      items.filter(i => i.product.sku !== sku)
    );
  }

  total = computed(() =>
    this.cart().reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    )
  );

  lineTotal(item: CartItem): number {
    return item.product.price * item.quantity;
  };

  clear(): void {
    this._cart.set([]);
  }
}
