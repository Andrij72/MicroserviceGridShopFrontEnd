import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../data-access/product.service';
import { catchError, of, tap } from 'rxjs';
import {CartService} from '../../cart/data-access/cart.service';
import {Product} from '../model/product.model';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule],
  templateUrl: 'product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  products = signal<Product[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  cartMessage = signal<string | null>(null);

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts() {
    this.loading.set(true);
    this.error.set(null);

    this.productService.getAll().pipe(
      tap(products => {
        console.log('Products from backend:', products);
        this.products.set(products);
        this.loading.set(false);
      }),
      catchError(err => {
        this.loading.set(false);
        this.error.set('Failed to load products');
        return of([]);
      })
    ).subscribe();
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
    this.cartMessage.set(`${product.name} added to cart 🛒`);
    setTimeout(() => this.cartMessage.set(null), 2000);
  }
}
