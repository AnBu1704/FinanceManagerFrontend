import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http'
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule, Routes, RouterOutlet, Router, ActivatedRoute } from '@angular/router'

import { AccountService } from '../../services/account.service';
import { LoginRegisterComponent } from '../login-register/login-register.component';

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

  errorMessage = signal('');
  hide = signal(true);

  constructor(private httpClient: HttpClient, private accountService: AccountService, private loginRegisterComponent: LoginRegisterComponent, private router: Router, private route: ActivatedRoute) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  registerClick() {
    this.loginRegisterComponent.register()
  }

  forgotPasswordClick() {
    this.loginRegisterComponent.forgotPassword()
  }

  loginClick() {

  }
}