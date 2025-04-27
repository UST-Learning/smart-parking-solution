import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { loginService } from '../service/loginService';
import { Router } from '@angular/router';
import { SessionService } from '@smart-parking/session';

@Component({
  selector: 'app-main',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  isVerified = false;
  otpVerify = false;
  isAdmin = false;
  loading = false;

  loginForm: FormGroup<any> = this.formBuilder.group({
    phone: [
      { value: '', disabled: false },
      [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
    ],
    password: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private cdf: ChangeDetectorRef,
    private loginService: loginService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit() {}

  onVerify() {
    const phone = this.loginForm.get('phone')?.value;
    console.log(this.loginForm.get('phone')?.value);

    if (phone) {
      this.loginForm.get('phone')?.disable();
      this.loading = true;

      this.loginService.verifyLogin(phone).subscribe({
        next: (res) => {
          this.loading = false;
          this.otpVerify = false;
          this.isAdmin = res.isAdmin;
          this.isVerified = res.isVerified;
          this.cdf.detectChanges();
        },
        error: (err) => {
          this.loading = false;
          this.loginForm.get('phone')?.enable();
          this.cdf.detectChanges();
          console.error('Error verifying login:', err);
        },
      });
    }
  }

  onLogin() {
    const phone = this.loginForm.get('phone')?.value;
    const password = this.loginForm.get('password')?.value;
    this.loginService.doLogin({phone, password}).subscribe((res) => {
      const token = res?.token ? res.token.split(' ')[1] : '';
      this.sessionService.loggIn(token);
      if (token) {
        this.router.navigate(['main_portal']);
      }
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }
}
