import { Injectable, signal } from '@angular/core';
import { Product } from '../../product/model/product.model';
import { CartItem } from '../model/cart-item.model';
import { HttpClient } from '@angular/common/http';
import { v4 as uuid } from 'uuid';
import { Observable } from 'rxjs';

export interface UserDetails {
  email: string;
  firstName: string;
  lastName: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private _cart = signal<CartItem[]>([]);

  constructor(private http: HttpClient) {}

  cart(): CartItem[] {
    return this._cart();
  }

  add(product: Product): void {
    this._cart.update(items => [...items, { product, quantity: 1, id: uuid() }]);
  }

  remove(item: CartItem): void {
    this._cart.update(items => items.filter(i => i.product.sku !== item.product.sku));
  }

  clear(): void {
    this._cart.set([]);
  }

  total(): number {
    return this._cart().reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }


}
