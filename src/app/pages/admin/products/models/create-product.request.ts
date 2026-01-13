export interface CreateProductRequest {
  sku: string;
  name: string;
  description?: string;
  price: number;
}
