import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../data-access/product.service';
import { CartService } from '../../order/data-access/cart.service';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';

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

  products$: Observable<Product[]> = this.productService.getAll();

  ngOnInit () {
    this.products$.subscribe(products => {
    console.log("Products from backend:", products)
  });

}

  addToCart(product: Product) {
    this.cartService.add(product);
    alert(`${product.name} added to cart 🛒`);
  }
}
