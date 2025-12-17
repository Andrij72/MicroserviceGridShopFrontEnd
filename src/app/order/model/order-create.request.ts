import { CartItem } from './cart-item.model';

export interface OrderCreateRequest {
  userId: string;
  items: CartItem[];
  total: number;
}
