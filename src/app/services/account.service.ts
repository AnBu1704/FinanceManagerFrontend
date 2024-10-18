import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { IAccount } from '../models/Account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accounts = ACCOUNTS

  constructor() { }

  // public getAccounts(): Observable<IAccount[]> {
  public getAccounts() {
    // return this.httpClient.get('https://localhost:7128/api/Accounts')
  }
}
