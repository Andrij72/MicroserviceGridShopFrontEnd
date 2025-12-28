import { Routes } from '@angular/router';
import { ProductService } from './data-access/product.service';

export const productRoutes: Routes = [
  {
    path: '',
    providers: [ProductService],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./list/product-list.component').then(m => m.ProductListComponent)
      },
      {
        path: ':sku',
        loadComponent: () =>
          import('./details/product-details.component').then(m => m.ProductDetailsComponent)
      }
    ]
  }
];
