import { Routes } from '@angular/router';
import { ClientLayoutComponent } from './core/layout/client-layout/client-layout.component';
import { AdminLayoutComponent } from './core/layout/admin-layout/admin-layout.component';

export const appRoutes: Routes = [

  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home')
            .then(m => m.Home)
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./features/products/product.routes')
            .then(m => m.productRoutes)
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/feature-cart/cart.component')
            .then(m => m.CartComponent)
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./features/orders/order.routes')
            .then(m => m.orderRoutes)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: () =>
      import('./pages/admin/admin.routes').then(m => {
        console.log('Loading Admin Routes');
        return m.ADMIN_ROUTES;
      })
  },

  {
    path: '**',
    redirectTo: 'home'
  }
];
