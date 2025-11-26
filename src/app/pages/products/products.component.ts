import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/cart.service';

@Component({
  selector: 'app-products',

  templateUrl: './products.component.html',
  standalone: true,
  styleUrls: ['./products.component.scss'],
  imports: [CommonModule]
})
export class ProductsComponent {

  products = [
    { id: 1, name: 'iPhone 15', price: 1500, image: 'https://via.placeholder.com/150?text=iPhone+15' },
    { id: 2, name: 'Pixel 8', price: 900, image: 'https://via.placeholder.com/150?text=Pixel+8' },
    { id: 3, name: 'Samsung S23', price: 1100, image: 'https://via.placeholder.com/150?text=Samsung+S23' },
    { id: 4, name: 'Xiaomi 14', price: 800, image: 'https://via.placeholder.com/150?text=Xiaomi+14' }
  ];

  constructor(private cart: CartService) {}

  addToCart(product: any) {
    this.cart.addToCart(product);
    console.log('Added:', product.name);
  }
}
