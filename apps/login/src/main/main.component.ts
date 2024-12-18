import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './main.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  isVerified: boolean = false;
  otpVerify: boolean = false;
  isAdmin: boolean = false;
  loading: boolean = false;

  loginForm: FormGroup<any> = this.formBuilder.group({
    phone: [{value: '', disabled: false}, Validators.required],
    password: ['']
  });

  constructor(private formBuilder: FormBuilder, private cdf: ChangeDetectorRef) {}

  ngOnInit() {}

  onVerify() {
    console.log(this.loginForm.get('phone')?.value);
    this.loginForm.get('phone')?.disable();
    this.loading = true;

    setTimeout(()=> {
      this.otpVerify = false;
      this.loading = false;
      this.isAdmin = true;
      this.isVerified = true;
      this.cdf.detectChanges();
    },2000);
  }

  onSubmit() {
    console.log(this.loginForm.getRawValue());
  }

}
