import { Component, AfterViewInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

import { AccountService } from './services/account.service';
import { IAccount } from './models/Account';

var ACCOUNTS: IAccount[]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'FinanceManagerFrontend';
  accounts = ACCOUNTS

  // constructor(private httpClient: HttpClient) {}
  constructor(private httpClient: HttpClient) {}

  ngAfterViewInit(): void {
    // this.getAccounts()
  }

  getAccounts(): void {
    this.httpClient.get<IAccount[]>('https://localhost:7128/api/Accounts').subscribe((data) => {
      this.accounts = data
      const jsonString: string = JSON.stringify(this.accounts)
      console.log(jsonString)
    })

    
  }
}
