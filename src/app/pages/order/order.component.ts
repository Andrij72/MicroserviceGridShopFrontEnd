import { Component, inject, signal } from '@angular/core';
import { OrderService, OrderResponse } from '../../core/services/order.service';
import { CommonModule, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  imports: [NgForOf, NgIf, CommonModule]
})
export class OrdersComponent {
  private orderService = inject(OrderService);

  orders = signal<OrderResponse[]>([]);


  constructor() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe({
      next: res => this.orders.set(res),
      error: err => console.error(err),
    });
  }

  deleteOrder(order: OrderResponse) {
    this.orderService.deleteOrder(order.orderNbr).subscribe({
      next: () => {
        alert('Order deleted ✅');
        this.loadOrders();
      },
      error: err => console.error(err)
    });
  }

  isPaid(order: OrderResponse) {
    // TODO isPaid
    return false;
  }
}
