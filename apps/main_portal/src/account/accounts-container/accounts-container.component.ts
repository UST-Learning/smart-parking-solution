import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SidebarModule } from 'primeng/sidebar';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { AccountService } from '../../service/account.service';
import { RouterModule } from '@angular/router';
import { LandingService } from '../../service/landing.service';

@Component({
  selector: 'app-accounts-container',
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    TagModule,
    SidebarModule,
    CreateAccountComponent,
    RouterModule,
  ],
  templateUrl: './accounts-container.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsContainerComponent implements OnInit {
  sidebarVisible = false;

  cols: any[] = [
    { field: 'name', header: 'Name' },
    { field: 'status', header: 'Status' },
    { field: 'address', header: 'City', subfield: 'city' },
    { field: 'address', header: 'Pin Code', subfield: 'pincode' },
    { field: 'sensor_count', header: 'Total Sensor' },
    { field: 'users_count', header: 'Users' },
    { field: 'actions', header: 'Action' },
  ];

  accounts: any[] = [];

  constructor(
    private accountService: AccountService,
    private landingService: LandingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.getAccounts().subscribe((data) => {
      this.accounts = [...data];
      this.cdr.detectChanges();
    });
  }

  onNewAccount() {
    this.sidebarVisible = true;
  }

  editAccount(account: any) {
    console.log('Edit account:', account);
  }

  onSave() {
    this.getAccounts();
    this.sidebarVisible = false;
  }

  onCancel() {
    this.sidebarVisible = false;
  }

  navigateToUsers(accountId: string) {
    console.log('Navigating to users from account for account ID:', accountId);
    this.landingService.updateValue(accountId);
  }

  refreshData() {
    this.getAccounts();
  }

}
