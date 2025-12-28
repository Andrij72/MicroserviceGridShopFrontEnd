import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../data-access/order.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Order } from '../model/order.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  private orderService = inject(OrderService);
  private oidcService = inject(OidcSecurityService);

  orders$: Observable<Order[]> = this.oidcService.userData$.pipe(
    map(user => user?.userData.sub),
    switchMap(userId => {
      if (!userId) return of([] as Order[]);
      return this.orderService.getOrdersByCurrentUser() as unknown as Observable<Order[]>;
    })
  );
}
