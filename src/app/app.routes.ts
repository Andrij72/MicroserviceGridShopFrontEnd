import { Routes } from '@angular/router';
import {CartComponent} from './features/cart/feature-cart/cart.component';

export const appRoutes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/product.routes').then(m => m.productRoutes)
  },

  { path: 'cart', component: CartComponent },

  {
    path: 'orders',
    loadChildren: () =>
      import('./features/orders/order.routes').then(m => m.orderRoutes)
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.routes').then(m => m.adminRoutes)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
