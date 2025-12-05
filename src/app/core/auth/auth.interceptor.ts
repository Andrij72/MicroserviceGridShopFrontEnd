import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private oidcService: OidcSecurityService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.oidcService.getAccessToken().pipe(
      switchMap(token => {
        console.log('Interceptor token:', token);
        const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

        return next.handle(authReq).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              console.warn('401 Unauthorized – redirect to Keycloak');
              this.oidcService.authorize();
            }
            return throwError(() => error);
          })
        );
      })
    );
  }
}
