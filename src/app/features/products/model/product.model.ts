export interface Product {
  enabled: string;
  sku: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}
