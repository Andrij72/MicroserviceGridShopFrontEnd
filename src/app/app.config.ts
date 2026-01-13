import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/auth/auth.interceptor';
import { AuthModule } from 'angular-auth-oidc-client';
import {appRoutes} from './app.routes';
import {provideRouter} from '@angular/router';
import {authConfig} from './core/auth/auth.config';

export let appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor])),
    ...AuthModule.forRoot({
      config: authConfig
    }).providers ?? []
  ],
};
