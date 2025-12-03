import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import {HeaderComponent} from './shared/header/header.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { Admin } from './pages/admin/admin';


export const appRoutes: Routes = [
  { path: '', component: Home },
  { path: 'header', component: HeaderComponent },
  { path: 'home', component: Home },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'admin', component: Admin }
];
