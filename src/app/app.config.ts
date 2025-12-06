import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/auth/auth.interceptor';
import { AuthModule } from 'angular-auth-oidc-client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    ...AuthModule.forRoot({
      config: {
        authority: 'http://host.docker.internal:8181/realms/MicroServicesGrid-realm',
        clientId: 'angular-client',
        redirectUrl: window.location.origin + '/products',
        postLogoutRedirectUri: window.location.origin,
        scope: 'openid profile email',
        responseType: 'code',
      }
    }).providers ?? []
  ]
};
