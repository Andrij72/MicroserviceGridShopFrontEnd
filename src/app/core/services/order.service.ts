import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from './cart.service';
import { Observable } from 'rxjs';

export interface OrderRequest {
  skuCode: string;
  price: number;
  quantity: number;
  userDetails: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface OrderResponse {
  orderNbr: string;
  skuCode: string;
  price: number;
  quantity: number;
  userDetails: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);

  createOrder(order: OrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>('/api/v1/orders', order);
  }

  getOrders(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>('/api/v1/orders');
  }

  getOrder(orderNbr: string): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`/api/v1/orders/${orderNbr}`);
  }

  deleteOrder(orderNbr: string): Observable<string> {
    return this.http.delete<string>(`/api/v1/orders/${orderNbr}`);
  }
}
