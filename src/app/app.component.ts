import { Component, AfterViewInit } from '@angular/core'
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http'
import { RouterOutlet } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

import { IAccount } from './models/Account';
import { AccountService } from './services/account.service';

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
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Finance Manager'
  account = ACCOUNT
  accounts = ACCOUNTS
  editedAccount: IAccount = { id: 12, name: "Edit Account", color: 654321} // AB: test data

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
