import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { loginService } from '../service/loginService';
import { LocalStorageService } from '@smart-parking/localStorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  isVerified: boolean = false;
  otpVerify: boolean = false;
  isAdmin: boolean = false;
  loading: boolean = false;

  loginForm: FormGroup<any> = this.formBuilder.group({
    phone: [{value: '', disabled: false}, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    password: ['']
  });

  constructor(private formBuilder: FormBuilder, 
    private cdf: ChangeDetectorRef, 
    private loginService: loginService, 
    private localStorageService: LocalStorageService,
    private router: Router) { }

  ngOnInit() {}

  onVerify() {
    console.log(this.loginForm.get('phone')?.value);
    this.loginForm.get('phone')?.disable();
    this.loading = true;

    this.loginService.verifyLogin().subscribe(res=>{
      this.loading = false;
      this.otpVerify = false;
      this.isAdmin = res.isAdmin;
      this.isVerified = res.isVerified;
      this.cdf.detectChanges();
    });
  }

  onLogin() {
    this.loginService.doLogin().subscribe(res =>{
      const token = (res?.token) ? res.token.split(' ')[1] : '';
      this.localStorageService.clear();
      if(token) {
        this.localStorageService.set('token', token);
        this.router.navigate(['home']);
      }
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

}
