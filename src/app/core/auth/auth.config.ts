import { OpenIdConfiguration } from 'angular-auth-oidc-client';

export const authConfig: OpenIdConfiguration = {

  authority: 'http://localhost:8181/realms/MicroServicesGrid-realm',
  clientId: 'angular-client',
  redirectUrl: window.location.origin + '/products',
  postLogoutRedirectUri: window.location.origin,
  scope: 'openid profile email',
  responseType: 'code',
  silentRenew: true,
  useRefreshToken: true,
  renewTimeBeforeTokenExpiresInSeconds: 30,
}
