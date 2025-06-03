import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsModule } from 'primeng/tabs';
import { AccountsContainerComponent } from '../account/accounts-container/accounts-container.component';
import { UsersContainerComponent } from '../user/users-container/users-container.component';
import { LandingService } from '../service/landing.service';

@Component({
  selector: 'app-landing',
  imports: [
    CommonModule,
    TabsModule,
    AccountsContainerComponent,
    UsersContainerComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit, OnDestroy {
  currentTab = 0;
  subscription: any;

  constructor(private landingService: LandingService) {}

  ngOnInit(): void {
    this.subscription = this.landingService.filterUsersObs
      .subscribe((accountId) => {
        if (accountId) {
          this.changeTab(1);
        }
      });
  }

  changeTab(tabIndex: any) {
    this.currentTab = tabIndex;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
