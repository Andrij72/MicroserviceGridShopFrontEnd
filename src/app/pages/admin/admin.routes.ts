import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../core/layout/admin-layout/admin-layout.component';
import { ProductFormComponent } from './products/pages/product-form/product-form.component';
import { ProductListComponent } from './products/pages/product-list/product-list.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'products',
        component: ProductListComponent
      },

      {
        path: 'products/create',
        component: ProductFormComponent
      },

      {
        path: 'products/:sku/edit',
        component: ProductFormComponent
      },

      // {
      //   path: 'orders',
      //   loadComponent: () => import('./orders/pages/order-list/order-list.component').then(m => m.OrderListComponent)
      // },

      // {
      //   path: 'users',
      //   loadComponent: () => import('./users/pages/user-list/user-list.component').then(m => m.UserListComponent)
      // },

      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      }
    ]
  }
];
