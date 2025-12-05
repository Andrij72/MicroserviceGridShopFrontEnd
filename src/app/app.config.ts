import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { AuthInterceptor, AuthModule } from 'angular-auth-oidc-client';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const authProviders = AuthModule.forRoot({
  config: {
    authority: 'http://host.docker.internal:8181/realms/MicroServicesGrid-realm',
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
    provideHttpClient(),
    ...authProviders,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
};
