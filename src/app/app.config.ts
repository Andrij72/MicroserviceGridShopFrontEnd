import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor, AuthModule } from 'angular-auth-oidc-client';

const authProviders = AuthModule.forRoot({
  config: {
    authority: 'http://localhost:8181/realms/MicroServicesGrid-realm',
    clientId: 'angular-client',
    redirectUrl: window.location.origin + '/products',
    postLogoutRedirectUri: window.location.origin,
    scope: 'openid profile email',
    responseType: 'code',
  }
}).providers ?? [];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptorsFromDi()),
    ...authProviders
  ]
};
