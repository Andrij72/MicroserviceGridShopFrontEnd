export interface CartItem {
  product: {
    sku: string;
    name?: string;
    price: number;
    description?: string;
    image?: string;
  };
  quantity: number;
}
