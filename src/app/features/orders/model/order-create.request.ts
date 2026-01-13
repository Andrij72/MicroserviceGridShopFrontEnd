import { CartItem } from '../../cart/model/cart-item.model';

export interface OrderCreateRequest {
  userId: string;
  items: CartItem[];
  total: number;
}
