import { AfterViewInit, ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http'
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Routes, RouterOutlet, Router, ActivatedRoute } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AccountService } from '../../services/account.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'login-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterOutlet,
    LoginComponent
  ],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent implements AfterViewInit {
  readonly email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = signal('');
  hide = signal(true);

  constructor(private httpClient: HttpClient, private accountService: AccountService, private router: Router, private route: ActivatedRoute) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  ngAfterViewInit(): void {
    this.router.navigate([{ outlets: { bottom: ['login'] }}], { relativeTo: this.route });
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

  public register() {
    this.router.navigate([{ outlets: { bottom: ['register'] }}], { relativeTo: this.route });
  }

  public forgotPassword() {
    this.router.navigate([{ outlets: { bottom: ['forgot-password'] }}], { relativeTo: this.route });
  }
  
  loginRegisterSelected(): boolean {
    console.log(this.router.url);
    
    if (this.router.url == "/login-register") {
      return true
    } else {
      return false
    }
  }
}
