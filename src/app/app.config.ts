import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthModule } from 'angular-auth-oidc-client';

const authProviders = AuthModule.forRoot({
  config: {
    authority: 'http://localhost:8181/realms/microservice-grid',
    clientId: 'angular-frontend',
    redirectUrl: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    scope: 'openid profile email',
    responseType: 'code',
  }
}).providers ?? [];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptorsFromDi()),
    ...authProviders  // розпаковуємо масив
  ]
};


