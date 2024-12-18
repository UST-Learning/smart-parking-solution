import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from '../../main/main.component';

@Component({
  imports: [CommonModule, MainComponent],
  selector: 'app-login-entry',
  template: `<app-main></app-main>`,
})
export class RemoteEntryComponent {}
