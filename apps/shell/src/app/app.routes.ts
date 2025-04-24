import { Route } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from '@smart-parking/authguard';

export const appRoutes: Route[] = [
  {
    path: 'main_portal',
    canMatch: [AuthGuard],
    loadChildren: () =>
      import('main_portal/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'payment',
    loadChildren: () => import('payment/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'page_not_found',
    loadChildren: () =>
      import('page_not_found/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'about',
    loadChildren: () => import('about/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'login',
    loadChildren: () => import('login/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/page_not_found',
    pathMatch: 'full',
  },
];
