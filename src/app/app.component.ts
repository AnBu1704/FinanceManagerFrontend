import { Component, AfterViewInit } from '@angular/core'
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http'
import { RouterOutlet } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

import { IAccount } from './models/Account';

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
  newAccount: IAccount = { id: 0, name: "New Account", color: 123456} // AB: test data
  editedAccount: IAccount = { id: 10, name: "Edit Account", color: 654321} // AB: test data

  output: string = ""

  constructor(private httpClient: HttpClient) {}

  getAccounts(): void {
    this.httpClient.get<IAccount[]>('https://localhost:7128/api/Accounts').subscribe(
      (data) => {
        this.accounts = data // Store account data
        this.parseJson(this.accounts) // Format and display the data
      },
      (error) => {
        this.handleError(error); // Fehler weiterverarbeiten
      }
    )  
  }

  getAccountInfo(id: number): void {
    this.httpClient.get<IAccount>('https://localhost:7128/api/Accounts/' + id).subscribe(
      (data) => {
        this.account = data // Store account data
        this.parseJson(this.account) // Format and display the data
      },
      (error) => {
        this.handleError(error); // Fehler weiterverarbeiten
      }
    )  
  }


  addAccount(account: IAccount): void {
    this.httpClient.post<IAccount>('https://localhost:7128/api/Accounts', account).subscribe(
      (data) => {
        this.account = data // Store account data
        this.parseJson(this.account) // Format and display the data
      },
      (error) => {
        this.handleError(error); // Fehler weiterverarbeiten
      }
    )  
  }

  editAccount(id: number, account: IAccount): void {
    this.httpClient.put<IAccount>('https://localhost:7128/api/Accounts/' + id, account).subscribe(
      (data) => {
        this.account = data // Store account data
        this.parseJson(this.account) // Format and display the data
      },
      (error) => {
        this.handleError(error); // Fehler weiterverarbeiten
      }
    )  
  }

  deleteAccount(id: number): void {
    this.httpClient.delete<IAccount>('https://localhost:7128/api/Accounts/' + id).subscribe(
      (data) => {
        this.account = data // Store account data
        this.parseJson(this.account) // Format and display the data
      },
      (error) => {
        this.handleError(error); // Fehler weiterverarbeiten
      }
    )  
  }
  
  public parseJson(data: any) {
    var jsonString: string = JSON.stringify(data) // Convert data to JSON string
    this.output = JSON.stringify(JSON.parse(jsonString), null, 2) // Format JSON with indentation
  }

  private handleError(error: any) {
    if (error.status === 0) {
      // Ein Netzwerkfehler ist aufgetreten (z.B. der Server ist nicht erreichbar)
      console.error('A network error occurred:', error.error);
    } else if (error.status >= 400 && error.status < 500) {
      // Client-seitiger Fehler (4xx)
      console.error('Client-side error occurred:', error.message);
    } else if (error.status >= 500) {
      // Server-seitiger Fehler (5xx)
      console.error('Server-side error occurred:', error.message);
    }
  }
  
}
