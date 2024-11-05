import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http'
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule, Routes, RouterOutlet, Router, ActivatedRoute } from '@angular/router'

import { AccountService } from '../../../services/account.service';
import { LoginRegisterComponent } from '../../login-register/login-register.component';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterOutlet,
    LoginRegisterComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly pw = new FormControl('', [Validators.required]);

  formGroup: FormGroup = new FormGroup({
    emailInput: this.email,
    pwInput: this.pw,
  })

  errorMessageEmail = signal('');
  errorMessagePW = signal('');
  hide = signal(true);

  loginButtonDisabled: boolean = true

  constructor(private httpClient: HttpClient, 
              private accountService: AccountService, 
              private loginRegisterComponent: LoginRegisterComponent, 
              private router: Router, 
              private route: ActivatedRoute) {
    merge(this.email.statusChanges, this.email.valueChanges, this.pw.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessageEmail.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessageEmail.set('Not a valid email');
    } else {
      this.errorMessageEmail.set('');
    }

    if (this.pw.hasError('required')) {
      this.errorMessagePW.set('You must enter a value');    
    } else {
      this.errorMessagePW.set('');
      this.pw.setErrors(null);
    }
    
    // this.isLoginButtonDisabled()
    if (this.errorMessageEmail() == '' && this.errorMessagePW() == '') {
      this.loginButtonDisabled = false
      // return false
    } else {
      this.loginButtonDisabled = true
      // return true
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  registerClick() {
    this.loginRegisterComponent.showRegisterComponent()
  }

  forgotPasswordClick() {
    this.loginRegisterComponent.showForgotPasswordComponent()
  }

  loginClick() {

  }
}