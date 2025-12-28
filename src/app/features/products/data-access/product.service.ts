import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product.model';

@Injectable()
export class ProductService {
  private api = 'http://localhost:9000/api/v1/products';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Product[]>(this.api);
  }

  getBySku(sku: string) {
    return this.http.get<Product>(`${this.api}/${sku}`);
  }
}
