import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/model/product';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { CartService } from '../../core/services/cart.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  imports: [
    CurrencyPipe, CommonModule
  ],
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private oidcService = inject(OidcSecurityService);
  private cartService = inject(CartService);

  products: Product[] = [];

  roles = toSignal(
    this.oidcService.userData$.pipe(
      map(d => d.userData?.realm_access?.roles || [])
    ),
    { initialValue: [] as string[] }
  );

  isAdmin = computed(() => this.roles().includes('ADMIN'));

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        console.log('Products loaded:', products);
      },
      error: (err: any) => console.error(err)
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: 'assets/images/placeholder.jpg'
    });
    console.log('Added to cart:', product);
  }


  editProduct(product: Product) {
    if (this.isAdmin()) {
      console.log('Editing product:', product);
      // todo edit form of product
    } else {
      console.warn('Access denied. Not an admin.');
    }
  }
}
