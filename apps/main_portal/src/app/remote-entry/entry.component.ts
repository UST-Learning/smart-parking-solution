import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [CommonModule, RouterOutlet],
  selector: 'app-main_portal-entry',
  template: `<router-outlet />`,
})
export class RemoteEntryComponent {}
