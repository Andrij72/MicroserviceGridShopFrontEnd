import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../model/cart-item.model';
import { Order } from '../model/order.model';
import {UserDetails} from './cart.service';

@Injectable({ providedIn: 'root' })
export class OrderService {

  constructor(private http: HttpClient) {}

  private readonly apiUrl = 'http://localhost:9000/api/v1/orders';

  createOrder(user: UserDetails, items: CartItem[]) {
    const order = {
      items: items.map(i => ({
        sku: i.product.sku,
        price: i.product.price,
        quantity: i.quantity
      })),
      userDetails: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    };

    console.log('Order payload:', order);
    return this.http.post(this.apiUrl, order);
  }

  getOrdersByUser(userId: string) {
    return this.http.get<Order[]>(
      `${this.apiUrl}/user/${userId}`
    );
  }
}
