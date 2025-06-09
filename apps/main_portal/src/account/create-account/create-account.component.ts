import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AccountService } from '../../service/account.service';

@Component({
  selector: 'app-create-account',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    MultiSelectModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './create-account.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAccountComponent implements OnInit {
  public account: any;
  public statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];
  public mode: 'create' | 'edit' = 'create'; // Default mode is create

  @Input() accountData: any = null; // Input to receive data from parent component
  @Output() saveEvent: EventEmitter<any> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    if (this.accountData) {
      this.mode = 'edit'; // If accountData is provided, set mode to edit
    }
    this.initializeForm(this.accountData);
  }

  private initializeForm(data?: any) {
    this.account = this.fb.group({
      name: [data?.name || '', Validators.required],
      status: [data?.status || null], // Or a default value
      sensor_count: [data?.sensor_count || null, [Validators.required, Validators.min(0)]],
      address: this.fb.group({
        pincode: [{value: data?.address?.pincode || '', disabled: this.mode === 'edit'}, [Validators.required, Validators.pattern('^[0-9]{6}$')], ], // Example pincode pattern
        city: [{value: data?.address?.city || '', disabled: this.mode === 'edit'}, Validators.required],
        state: [{value: data?.address?.state || '', disabled: this.mode === 'edit'}, Validators.required],
      }),
    });
  }

  onSave() {
    if (this.account.valid) {
      if (this.mode === 'create') {
        this.accountService
          .createAccount(this.account.value)
          .subscribe((response) => {
            this.saveEvent.next('saved');
          });
      } else if (this.mode === 'edit') {
        this.accountService
          .updateAccount(this.accountData._id, this.account.value)
          .subscribe((response) => {
            this.saveEvent.next('updated');
          });
      }
    } else {
      // Handle form errors
      console.log('Form is invalid');
    }
  }

  onCancel() {
    this.cancelEvent.emit('cancel');
  }
}
