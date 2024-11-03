import { Component } from '@angular/core'
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http'
import { RouterModule, Routes, RouterOutlet, Router } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

import { IAccount } from './models/Account';
import { AccountService } from './services/account.service';
import { LoginRegisterComponent } from './components/login-register/login-register.component';

var ACCOUNT: IAccount
var ACCOUNTS: IAccount[]
var NEWACCOUNT: IAccount

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterOutlet,
    HttpClientModule,
    LoginRegisterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Finance Manager'
  account = ACCOUNT
  accounts = ACCOUNTS
  editedAccount: IAccount = { id: 5, name: "Edit Account", description: "Edit Account", eMail: "edited@email.com" } // AB: test data

  output: string = ""

  constructor(private httpClient: HttpClient, private accountService: AccountService) {}

  getAccounts(): void {
    this.accountService.getAccounts(this.httpClient).subscribe((data) => {
      if (data != null)  {
        this.accounts = data; // Store received accounts
        this.parseJson(data);  // Format and display the data
      }
    });
  }

  getAccount(id: number): void {
      this.accountService.getAccount(this.httpClient, id).subscribe((data) => {
        if (data != null)  {
          this.account = data; // Store received accounts
          this.parseJson(data);  // Format and display the data
        }
      });
  }

  getAccountInfo(id: number): void {
      this.accountService.getAccountInfo(this.httpClient, id).subscribe((data) => {
        if (data != null)  {
          this.account = data; // Store received accounts
          this.parseJson(data);  // Format and display the data
        }
      });
  }

  addAccount(): void {
      this.accountService.addAccount(this.httpClient).subscribe((data) => {
          if (data != null)  {
          this.account = data; // Store received accounts
          this.parseJson(data);  // Format and display the data
        }
      });
  }

  editAccount(id: number, account: IAccount): void {
      this.accountService.editAccount(this.httpClient, id, account).subscribe((data) => {
          if (data != null)  {
          this.account = data; // Store received accounts
          this.parseJson(data);  // Format and display the data
        }
      });
  }

  deleteAccount(id: number): void {
      this.accountService.deleteAccount(this.httpClient, id).subscribe((data) => {
          if (data != null)  {
          this.account = data; // Store received accounts
          this.parseJson(data);  // Format and display the data
        }
      });
  }

  public parseJson(data: any) {
      const jsonString: string = JSON.stringify(data); // Convert data to JSON string
      this.output = JSON.stringify(JSON.parse(jsonString), null, 2); // Format JSON with indentation
  }

}
