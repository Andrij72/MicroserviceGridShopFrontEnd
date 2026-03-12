export interface CartItem {
  product: {
    sku: string;
    name?: string;
    price: number;
    description?: string;
    imageUrl?: string;
  };
  quantity: number;
}
