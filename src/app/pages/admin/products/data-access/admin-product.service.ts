import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProductRequest } from '../models/create-product.request';
import { UpdateProductRequest } from '../models/update-product.request';
import { AdminProduct } from '../models/admin-product.model';
import {PageResponse} from '../../../../features/products/model/PageResponse';

@Injectable({ providedIn: 'root' })
export class AdminProductService {

  private readonly api = 'http://localhost:9000/api/v1/admin/products';

  constructor(private http: HttpClient) {}

  getProducts(page = 0, size = 10, sortBy = 'createdAt', sortDir = 'desc') {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    return this.http.get<PageResponse<AdminProduct>>(this.api, { params });
  }

  getProduct(sku: string) {
    return this.http.get<AdminProduct>(`${this.api}/${sku}`);
  }

  create(request: CreateProductRequest) {
    return this.http.post<AdminProduct>(this.api, request);
  }

  update(sku: string, request: UpdateProductRequest) {
    return this.http.put<AdminProduct>(`${this.api}/${sku}`, request);
  }

  enable(sku: string) {
    return this.http.patch<void>(`${this.api}/${sku}/enable`, {});
  }

  disable(sku: string) {
    return this.http.patch<void>(`${this.api}/${sku}/disable`, {});
  }

  deleteBatch(skus: string[]) {
    return this.http.request<void>('delete', `${this.api}/batch`, {
      body: skus
    });
  }
}
