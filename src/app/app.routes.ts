import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { LoginComponent } from './components/login-register/login/login.component';
import { RegisterComponent } from './components/login-register/register/register.component';
import { ForgotPasswordComponent } from './components/login-register/forgot-password/forgot-password.component';

export const routes: Routes = [
  {
    path: 'login-register', component: LoginRegisterComponent, children: [
      { path: 'login', component: LoginComponent, outlet: 'bottom' },
      { path: 'register', component: RegisterComponent, outlet: 'bottom' },
      { path: 'forgot-password/:email', component: ForgotPasswordComponent, outlet: 'bottom' },
    ],
  },
  { 
    path: '', redirectTo: '/login-register', pathMatch: 'full' 
  }, 
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}