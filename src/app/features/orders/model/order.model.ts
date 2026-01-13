import { CartItem } from '../../cart/model/cart-item.model';

export interface Order {
  userId: string;
  items: CartItem[];
  total: number;
  createdAt: string;
}
