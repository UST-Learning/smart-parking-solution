import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { LandingComponent } from '../../landing/landing.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntryComponent,
    children: [
      { path: '', component: LandingComponent },
    ],
  },
];
