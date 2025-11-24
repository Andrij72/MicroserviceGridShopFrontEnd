import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { Admin } from './pages/admin/admin';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const appRoutes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'admin', component: Admin },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
];
