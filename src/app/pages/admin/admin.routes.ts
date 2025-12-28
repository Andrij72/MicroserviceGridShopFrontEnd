import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    children: [
  //     {
  //       path: 'products',       // керування продуктами
  //       loadComponent: () =>
  //         import('./products-management/products-management.component')
  //           .then(m => m.ProductsManagementComponent)
  //     },
  //     {
  //       path: 'orders',         // перегляд всіх ордерів
  //       loadComponent: () =>
  //         import('./orders-management/orders-management.component')
  //           .then(m => m.OrdersManagementComponent)
  //     },
  //     {
  //       path: 'users',          // керування користувачами
  //       loadComponent: () =>
  //         import('./users-management/users-management.component')
  //           .then(m => m.UsersManagementComponent)
  //     },
  //     {
  //       path: '',
  //       redirectTo: 'products',
  //       pathMatch: 'full'
  //     }
    ]
   }
];
