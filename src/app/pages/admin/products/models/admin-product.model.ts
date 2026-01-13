export interface AdminProduct {
  sku: string;
  name: string;
  description?: string;
  price: number;
  enabled: boolean;
  createdAt: string;
}
