import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { IAccount } from '../models/Account';

var ACCOUNTS: IAccount[]

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accounts = ACCOUNTS

  constructor() { }

  // public getAccounts(): Observable<IAccount[]> {
  public getAccounts() {
    // this.httpClient.get<IAccount[]>('https://localhost:7128/api/Accounts').subscribe((data) => {
    //   console.log(data)
    //   // this.accounts = data
    // })

    // return this.accounts
  }
}
