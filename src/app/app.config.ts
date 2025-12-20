import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/auth/auth.interceptor';
import { AuthModule } from 'angular-auth-oidc-client';
import {appRoutes} from './app.routes';
import {provideRouter} from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor])),
    ...AuthModule.forRoot({
      config: {
        authority: 'http://localhost:8181/realms/MicroServicesGrid-realm',
        clientId: 'angular-client',
        redirectUrl: window.location.origin + '/products',
        postLogoutRedirectUri: window.location.origin,
        scope: 'openid profile email',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        // secureRoutes: ['http://localhost:9000/api']
      },
    }).providers ?? []
  ],
};
