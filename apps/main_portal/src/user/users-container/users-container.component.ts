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
    private cdr: ChangeDetectorRef
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
  subscription: any;

  ngOnInit() {
    this.getUsers();
    this.subscription = this.landingService.filterUsersObs.subscribe(
      (accountId) => {
        console.log('Received account ID:', accountId);
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
      this.cdr.detectChanges();
    });
  }

  filterUsersByAccount(accountId: any) {
    console.log('Filter users by account ID:', accountId);
    this.users = this.users.filter((user) => user.account_id === accountId);
    this.cdr.detectChanges();
  }

  onNewUser() {
    this.sidebarVisible = true;
  }

  editUser(user: any) {
    console.log('Edit user:', user);
  }

  onSave() {
    this.getUsers();
    this.sidebarVisible = false;
  }

  onCancel() {
    this.sidebarVisible = false;
  }

  // TODO: Implement delete functionality
  onDeleteUser(event: any, user: any) {
    alert('Delete user functionality is not implemented yet.');
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.users = []; // Clear users array
    this.cdr.detach(); // Detach ChangeDetectorRef to stop change detection
  }
}
