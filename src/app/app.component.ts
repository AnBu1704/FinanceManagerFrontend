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
  title = 'FinanceManagerFrontend'
  account = ACCOUNT
  accounts = ACCOUNTS
  newAccount: IAccount = { id: 0, name: "New Account", color: 123456} // AB: test data
  editedAccount: IAccount = { id: 11, name: "Edit Account", color: 654321} // AB: test data

  output: string = ""

  constructor(private httpClient: HttpClient) {}

  public parseJson(data: any) {
    var jsonString: string = JSON.stringify(data) // Convert data to JSON string
    this.output = JSON.stringify(JSON.parse(jsonString), null, 2) // Format JSON with indentation
  }

  getAccounts(): void {
      try {
          this.httpClient.get<IAccount[]>('https://localhost:7128/api/Accounts').subscribe((data) => {
              this.accounts = data // Store account data
              this.parseJson(this.accounts) // Format and display the data
          })        
      } catch (error) {
        console.log('%c ERROR:                                    \n', 'background: #960a0a80 color: #ffffff') // Log error details
        console.log("AppComponent\ngetAccounts()\nhttpClient.get<IAccount[]>\n" + error) // Log error details      
      }
  }

  getAccountInfo(id: number): void {
      try {
          this.httpClient.get<IAccount>('https://localhost:7128/api/Accounts/' + id).subscribe((data) => {
              this.account = data // Store single account data
              this.parseJson(this.account) // Format and display the data
          })
      } catch (error) {
        console.log('%c ERROR:                                    \n', 'background: #960a0a80 color: #ffffff') // Log error details
        console.error("AppComponent\ngetAccount()\nhttpClient.get<IAccount>\n" + error) // Log error details      
      }
  }


  addAccount(account: IAccount): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })

    this.httpClient.post<IAccount>('https://localhost:7128/api/Accounts', account, { headers }).subscribe(
      (data) => {
        console.log(data)
        this.account = data // Store single account data
        this.parseJson(this.account) // Format and display the data
      }
      // (error) => {
      //   console.log('%c ERROR:                                    \n', 'background: #960a0a80 color: #ffffff') // Log error details
      //   console.error("AppComponent\ngetAccount()\nhttpClient.get<IAccount>\n" + error) // Log error details  
                
      // }
    )  
  }

  editAccount(id: number, account: IAccount): void {
    this.httpClient.put<IAccount>('https://localhost:7128/api/Accounts/' + id, account).subscribe((data) => {
      console.log(data)
      this.account = data // Store single account data
      this.parseJson(this.account) // Format and display the data
    })
    try {
      
    } catch (error) {
      console.log('%c ERROR:                                    \n', 'background: #960a0a80 color: #ffffff') // Log error details
      console.log("AppComponent\ngetAccount()\nhttpClient.get<IAccount>\n" + error) // Log error details      
    }
  }

  deleteAccount(id: number): void {
    try {
      this.httpClient.delete<IAccount>('https://localhost:7128/api/Accounts/' + id).subscribe((data) => {
        console.log(data)
        this.account = data // Store single account data
        this.parseJson(this.account) // Format and display the data
      })

    } catch (error) {
      console.log('%c ERROR:                                    \n', 'background: #960a0a80 color: #ffffff') // Log error details
      console.log("AppComponent\ngetAccount()\nhttpClient.get<IAccount>\n" + error) // Log error details      
    }
  }
}
