import { Component, AfterViewInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { IAccount } from './models/Account';

var ACCOUNTS: IAccount[]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    RouterOutlet,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FinanceManagerFrontend';
  accounts = ACCOUNTS

  output: string = ""

  constructor(private httpClient: HttpClient) {}

  public parseJson(data: any) {
    var jsonString: string = JSON.stringify(data)
    this.output = JSON.stringify(JSON.parse(jsonString),null,2)

    const outputElement: HTMLElement = document.getElementById('output') as HTMLElement 
  }

  getAccounts(): void {
    try {
      this.httpClient.get<IAccount[]>('https://localhost:7128/api/Accounts').subscribe((data) => {
        this.accounts = data
        this.parseJson(this.accounts)
      })
    } catch (error) {
      console.log(error)
    }
    
  }
}
