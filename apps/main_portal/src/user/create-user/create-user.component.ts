import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() saveEvent: EventEmitter<any> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<any> = new EventEmitter();

  userForm: FormGroup<any> | undefined;
  userRoleOptions: { label: string; value: string }[] = [];
  accountOptions: { label: string; value: string }[] = [];

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.getAccountsMetadata();

    this.userRoleOptions = Object.values(ROLETYPE).map((type) => ({
      label: type,
      value: type,
    }));

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      account_id: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  getAccountsMetadata() {
    this.userService.getAccountsMetadata().subscribe((data) => {
      console.log('Accounts Metadata:', data);
      this.accountOptions = data;
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
