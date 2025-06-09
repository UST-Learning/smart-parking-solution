import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
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
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
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
  selectedAccount: any = null;

  constructor(
    private accountService: AccountService,
    private landingService: LandingService,
    private cdr: ChangeDetectorRef,
    private confirmationService: ConfirmationService
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
    this.selectedAccount = null;
    this.sidebarVisible = true;
  }

  onEditAccount(account: any) {
    if (account) {
      this.selectedAccount = account;
      this.sidebarVisible = true;
    }
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

  onDeleteAccount(event: any, account: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message:
        'The associated users with this account will also be deleted. Do you still want to delete this account?',
      header: `Account: ${account.name}`,
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this.accountService.deleteAccount(account._id).subscribe({
          next: (res) => {
            if (res.deletedCount > 0) {
              this.getAccounts();
            }
          },
          error: (err) => {
            console.error('Error deleting account:', err);
            alert(`Error details: ${err.error}`);
          },
        });
      },
      reject: () => {
        console.log('Confirmed rejected delete for account:');
      },
    });
  }
}
