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
  selector: 'app-forgot-password',
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
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);

  errorMessageEmail = signal('');  
  hide = signal(true);

  forgetPasswordButtonDisabled: boolean = true

  constructor(private httpClient: HttpClient, 
    private accountService: AccountService, 
    private loginRegisterComponent: LoginRegisterComponent, 
    private router: Router, 
    private route: ActivatedRoute) {
      merge(this.email.statusChanges, this.email.valueChanges)
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

      if (this.errorMessageEmail() == '') {
        this.forgetPasswordButtonDisabled = false
      } else {
        this.forgetPasswordButtonDisabled = true
      }
    }

    clickEvent(event: MouseEvent) {
      this.hide.set(!this.hide());
      event.stopPropagation();
    }

    backClick() {
      this.loginRegisterComponent.showLoginComponent()
    }

    forgotPasswordClick() {
      
    }
}
