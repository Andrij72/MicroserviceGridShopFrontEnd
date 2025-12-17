import { CartItem } from './cart-item.model';

export interface Order {
  userId: string;
  items: CartItem[];
  total: number;
  createdAt: string;
}
