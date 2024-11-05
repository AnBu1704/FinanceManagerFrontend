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
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email])
  readonly pw = new FormControl('', [Validators.required])
  readonly rpw = new FormControl('', [Validators.required])

  formGroup: FormGroup = new FormGroup({
    emailInput: this.email,
    pwInput: this.pw,
    rpwInput: this.rpw
  })

  errorMessageEmail = signal('');
  errorMessagePW = signal('');
  hide = signal(true);

  registerButtonDisabled: boolean = true

  constructor(private httpClient: HttpClient, 
              private accountService: AccountService, 
              private loginRegisterComponent: LoginRegisterComponent, 
              private router: Router, 
              private route: ActivatedRoute) {
    merge(this.email.statusChanges, this.email.valueChanges, this.pw.valueChanges, this.rpw.valueChanges)
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

    if (this.pw.hasError('required') || this.rpw.hasError('required')) {
      this.errorMessagePW.set('You must enter a value');
    } else if (this.formGroup.controls['pwInput'].value != this.formGroup.controls['rpwInput'].value) {
      this.errorMessagePW.set('Passwords are different');
      this.pw.setErrors({ mismatch: true });
      this.rpw.setErrors({ mismatch: true });
    } else {
      this.errorMessagePW.set('');
      this.pw.setErrors(null);
      this.rpw.setErrors(null);
    }

    this.isRegisterButtonDisabled()    
  }

  isRegisterButtonDisabled(): boolean {
    if (this.errorMessageEmail() == '' && this.errorMessagePW() == '') {
      this.registerButtonDisabled = false
      // return false
    } else {
      this.registerButtonDisabled = true
      // return true
    }

    return this.registerButtonDisabled
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  loginClick() {
    this.loginRegisterComponent.showLoginComponent()
  }

  registerClick() {

  }
}
