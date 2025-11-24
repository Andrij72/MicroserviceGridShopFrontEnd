import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/cart.service';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [CommonModule]
})
export class ProductsComponent {
  constructor(private cart: CartService) {}

  products = signal<Product[]>([
    { id: 1, name: 'iPhone 15', price: 1500, image: 'https://via.placeholder.com/150?text=iPhone+15' },
    { id: 2, name: 'Pixel 8', price: 900, image: 'https://via.placeholder.com/150?text=Pixel+8' },
    { id: 3, name: 'Samsung S23', price: 1100, image: 'https://via.placeholder.com/150?text=Samsung+S23' },
    { id: 4, name: 'Xiaomi 14', price: 800, image: 'https://via.placeholder.com/150?text=Xiaomi+14' }
  ]);

  addToCart(product: Product) {
    this.cart.addToCart(product);
    console.log(`Added to cart: ${product.name}`);
  }
}
