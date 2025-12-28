import { Routes } from '@angular/router';
import { CartComponent } from '../cart/feature-cart/cart.component';

export const orderRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'my',
        loadComponent: () =>
          import('./list/orders.component').then(m => m.OrdersComponent)
      },
      {
        path: '',
        redirectTo: 'my',
        pathMatch: 'full'
      }
    ]
  }
];
