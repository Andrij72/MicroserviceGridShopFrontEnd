import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../../cart/model/cart-item.model';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs';

export interface UserDetails {
  email: string;
  firstName: string;
  lastName: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);
  private oidc = inject(OidcSecurityService);

  private readonly apiUrl = 'http://localhost:9000/api/v1/orders';

  async createOrder(items: CartItem[]) {
    const userData = await firstValueFrom(this.oidc.userData$);
    if (!userData?.userData) throw new Error('User not found');

    const user: UserDetails = {
      email: userData.userData.email,
      firstName: userData.userData.given_name,
      lastName: userData.userData.family_name
    };

    const order = {
      items: items.map(i => ({
        sku: i.product.sku,
        price: i.product.price,
        quantity: i.quantity
      })),
      userDetails: user
    };

    console.log('Order payload:', order);
    return firstValueFrom(this.http.post(this.apiUrl, order));
  }

  getOrdersByCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/current`);
  }
}
