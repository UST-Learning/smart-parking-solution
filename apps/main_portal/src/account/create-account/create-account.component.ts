import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AccountService } from '../../service/account.service';
import { ActivatedRoute, Router } from '@angular/router';

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
export class CreateAccountComponent {
  public account: any;
  public statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];
  public adminUserOptions = [
    { label: 'User1', value: 'user1' },
    { label: 'User2', value: 'user2' },
    { label: 'User3', value: 'user3' },
  ];

  constructor(private fb: FormBuilder, private accountService: AccountService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.account = this.fb.group({
      name: ['', Validators.required],
      status: [null], // Or a default value
      sensor_count: [null, [Validators.required, Validators.min(0)]],
      admin_users: [[]], // Default to an empty array
      address: this.fb.group({
        pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]], // Example pincode pattern
        city: ['', Validators.required],
        state: ['', Validators.required],
      }),
    });
  }

  onSubmit() {
    console.log(this.account.value);
    if (this.account.valid) {
      this.accountService.saveAccount(this.account.value).subscribe((response)=>{
        console.log('Account saved successfully:', response);
        this.router.navigate(['main_portal']);
      });
    } else {
      // Handle form errors
      console.log('Form is invalid');
    } 
  }
}
