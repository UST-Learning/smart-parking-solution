import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { LandingComponent } from '../../landing/landing.component';
import { CreateAccountComponent } from '../../account/create-account/create-account.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntryComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'create-account', component: CreateAccountComponent },
    ],
  },
];
