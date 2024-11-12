import { ChangeDetectionStrategy, Component, signal, ChangeDetectorRef } from '@angular/core';
import { NgIf } from '@angular/common'
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http'
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule, Routes, RouterOutlet, Router, ActivatedRoute } from '@angular/router'

import { AccountService } from '../../../services/account.service';
import { LoginRegisterComponent } from '../../login-register/login-register.component';

import { merge } from 'rxjs';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterOutlet,
    LoginRegisterComponent,
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

  errorMessageLogin: string = ''

  constructor(private httpClient: HttpClient, 
              private accountService: AccountService, 
              private loginRegisterComponent: LoginRegisterComponent, 
              private router: Router, 
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef) {
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
    
    if (this.errorMessageEmail() == '' && this.errorMessagePW() == '') {
      this.loginButtonDisabled = false
    } else {
      this.loginButtonDisabled = true
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
    this.accountService.forgotPasswordMail = this.email.value == null ? "" : this.email.value
    console.log(this.accountService.forgotPasswordMail);
    

    this.loginRegisterComponent.showForgotPasswordComponent()
  }

  loginClick() {
    this.accountService.login(this.httpClient, 
                              this.email.value == null ? "" : this.email.value, 
                              this.pw.value == null ? "" : this.pw.value).subscribe({
      next: (response) => {
        console.log(response);
        this.errorMessageLogin = ''
        this.cdr.detectChanges(); // Änderung explizit bekannt machen
        // Weiterleitung zur nächsten Seite oder Speichern des Tokens
      },
      error: (error) => {
        if (error.status === 400) {
          this.errorMessageLogin = 'Entered incorrect login information\ntoo often'
          this.cdr.detectChanges(); // Änderung explizit bekannt machen
          console.error(this.errorMessageLogin)
        } 
        else if (error.status === 401) {
          this.errorMessageLogin = 'Login information false'
          this.cdr.detectChanges(); // Änderung explizit bekannt machen
          console.error(this.errorMessageLogin)
        } else {
          this.errorMessageLogin = 'Login information false'
          this.cdr.detectChanges(); // Änderung explizit bekannt machen
          console.error(new Error(this.errorMessageLogin))
        }
      }
    });
  }
}