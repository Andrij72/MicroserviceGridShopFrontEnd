import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import {AdminComponent} from './pages/admin/admin';


export const appRoutes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'admin', component: AdminComponent },

  {
    path: 'products',
    loadChildren: () =>
      import('./product/product.routes')
        .then(m => m.productRoutes)
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./order/order.routes')
        .then(m => m.orderRoutes)
  },


  { path: '**', redirectTo: '' }
];
