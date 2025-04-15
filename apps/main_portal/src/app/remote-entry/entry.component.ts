import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from '../../landing/landing.component';

@Component({
  imports: [CommonModule, LandingComponent],
  selector: 'app-main_portal-entry',
  template: `<app-landing></app-landing>`,
})
export class RemoteEntryComponent {}
