import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, switchMap } from 'rxjs';

export const authInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const oidcService = inject(OidcSecurityService);

  return oidcService.getAccessToken().pipe(

    switchMap(token => {
      console.log('Token in interceptor before clone available:', token);
      const authReq = token ?
        req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) :

        req;console.log('Headers after clone:', authReq.headers.keys());
      console.log('Authorization header after clone:', authReq.headers.get('Authorization'));
      return next(authReq);
    })
  );
};
