import { Routes } from '@angular/router';
import {CartComponent} from './feature-cart/cart.component';



export const orderRoutes: Routes = [
  {
    path: '',
    providers: [],
    children: [
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: '',
        redirectTo: 'cart',
        pathMatch: 'full'
      },
      {
        path: 'my',
        loadComponent: () =>
          import('./feature-orders/orders.component')
            .then(m => m.OrdersComponent)
      }
    ]
  }
];
