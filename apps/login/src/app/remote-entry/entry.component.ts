import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../login/login.component';

@Component({
  imports: [CommonModule, LoginComponent],
  selector: 'app-login-entry',
  template: `<app-main></app-main>`,
})
export class RemoteEntryComponent {}
