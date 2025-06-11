import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ROLETYPE } from '@smart-parking/data-access';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-create-user',
  imports: [CommonModule, ReactiveFormsModule, DropdownModule, ButtonModule],
  templateUrl: './create-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUserComponent implements OnInit {

  @Input() userData: any = null;
  @Output() saveEvent: EventEmitter<any> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<any> = new EventEmitter();

  userForm: FormGroup<any> | undefined;
  userRoleOptions: { label: string; value: string }[] = [];
  accountOptions: { label: string; value: string }[] = [];

  mode: 'create' | 'edit' = 'create';

  constructor(private fb: FormBuilder, private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getAccountsMetadata();
    if(this.userData) {
      this.mode = 'edit';
    }

    this.userRoleOptions = Object.values(ROLETYPE).map((type) => ({
      label: type,
      value: type,
    }));
    this.initializeFrom(this.userData);
  }

  private initializeFrom(userData?: any) {
      this.userForm = this.fb.group({
      name: [userData?.name || '', Validators.required],
      email: [{value: userData?.email || '', disabled: this.mode === 'edit' }, [Validators.required, Validators.email]],
      phone: [{value: userData?.phone || '', disabled: this.mode === 'edit'}, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      account_id: [{value: userData?.account_id || '', disabled: this.mode === 'edit'}, Validators.required],
      role: [userData?.role || '', Validators.required],
    });
  }

  getAccountsMetadata() {
    this.userService.getAccountsMetadata().subscribe((data) => {
      console.log('Accounts Metadata:', data);
      this.accountOptions = data;
      this.cdr.detectChanges();
    });
  }

  onCancel() {
    this.cancelEvent.emit('cancel');
  }

  onSave() {
    if (this.userForm && this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe((response) => {
        console.log('User saved successfully:', response);
        this.saveEvent.emit('saved');
      });
    } else {
      if(this.userForm) {
        this.userForm.markAllAsTouched();
      }
      console.error('Form is invalid');
    }
  }

}
