import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from '@smart-parking/authinterceptor';
import { SessionService } from '@smart-parking/session';
import { AuthGuard } from '@smart-parking/authguard';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    {provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true},
    SessionService,
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
          preset: Lara,
          options: {
            darkModeSelector: 'none'
          }
      }
  }),
  AuthGuard
  ],
};
