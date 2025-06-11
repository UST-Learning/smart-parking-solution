import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { UserService } from '../../service/user.service';
import { LandingService } from '../../service/landing.service';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-users-container',
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    SidebarModule,
    CreateUserComponent,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  templateUrl: './users-container.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersContainerComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UserService,
    private landingService: LandingService,
    private cdr: ChangeDetectorRef,
    private confirmationService: ConfirmationService
  ) {}

  cols: any[] = [
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'phone', header: 'Phone' },
    { field: 'account_name', header: 'Account' },
    { field: 'role', header: 'Role' },
    // { field: 'admin', header: 'Admin' },
    { field: 'actions', header: 'Action' },
  ];

  sidebarVisible = false;

  users: any[] = [];
  filteredUsers: any[] = [];
  selectedUser: any = null;
  subscription: any;

  ngOnInit() {
    this.getUsers();
    this.subscription = this.landingService.filterUsersObs.subscribe(
      (accountId) => {
        if (accountId) {
          this.filterUsersByAccount(accountId);
        } else {
          this.getUsers();
        }
      }
    );
  }

  getUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = [...data];
      this.filteredUsers = [...data];
      this.cdr.detectChanges();
    });
  }

  filterUsersByAccount(accountId: any) {
    console.log('Filter users by account ID:', accountId);
    this.filteredUsers = this.users.filter((user) => user.account_id === accountId);
    this.cdr.detectChanges();
  }

  onNewUser() {
    this.sidebarVisible = true;
  }

  onEditUser(user: any) {
    console.log('Edit user:', user);
    this.selectedUser = user;
    this.sidebarVisible = true;
  }

  onSave() {
    this.getUsers();
    this.sidebarVisible = false;
  }

  onCancel() {
    this.sidebarVisible = false;
  }

  onDeleteUser(event: any, user: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this user? This action cannot be undone.',
      header: `User: ${user.name}`,
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
        this.userService.deleteUser(user._id).subscribe({
          next: (res) => {
            if (res.deletedCount > 0) {
              this.getUsers();
            }
          },
          error: (err) => {
            console.error('Error deleting user:', err);
            alert(`Error details: ${err.error}`);
          },
        });
      },
      reject: () => {
        console.log('Confirmed rejected delete for user:');
      },
    });
  }

  refreshData() {
    this.getUsers();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.users = [];
    this.filteredUsers = [];
    this.cdr.detach(); // Detach ChangeDetectorRef to stop change detection
  }
}
