import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../data-access/product.service';
import { CartService } from '../../order/data-access/cart.service';
import { Product } from '../model/product.model';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'product-details.component.html',
  styleUrls: ['product-details.component.scss']
})
export class ProductDetailsComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);


  addedMessage = signal('');

  product$: Observable<Product> = this.route.params.pipe(
    switchMap(params => this.productService.getBySku(params['sku']))
  );

  addToCart(product: Product) {
    this.cartService.add(product);

    this.addedMessage.set(`${product.name} added to cart 🛒`);

    // через 2 секунди прибираємо повідомлення
    setTimeout(() => this.addedMessage.set(''), 2000);
  }
}
