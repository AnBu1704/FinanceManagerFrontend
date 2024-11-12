import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { IAccount } from '../models/Account';
import { IAccountInfoAccount } from '../models/AccountInfo';
// import { handleHttpError } from '../TS/ErrorHandling';

var ACCOUNT: Observable<IAccount>
var ACCOUNTS: Observable<IAccount[]>
var NEWACCOUNT: IAccount

export interface ILoginRequestData {
  mail: string
  password: string
}

export interface IForgotPassword {
  status: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  account = ACCOUNT
  accounts = ACCOUNTS
  newAccount: IAccount = { id: 0, name: "New Account", description: "New Account", eMail: "new@email.com" }
  forgotPasswordMail: string = ""
  
  constructor() { }

  public getAccounts(httpClient: HttpClient): Observable<IAccount[] | void> {
    return httpClient.get<IAccount[]>('https://localhost:5001/api/Accounts')
    // .pipe((error) => { console.error(this.handleHttpError(error)) }); // Verwende die ausgelagerte handleError
  }

  public getAccount(httpClient: HttpClient, id: number): Observable<IAccount> {
    return httpClient.get<IAccount>('https://localhost:5001/api/Accounts/' + id)
    // .pipe((error) => { console.error(this.handleHttpError(error)) }); // Verwende die ausgelagerte handleError
  }

  public getAccountInfo(httpClient: HttpClient, id: number): Observable<IAccountInfoAccount> {
    return httpClient.get<IAccountInfoAccount>('https://localhost:5001/api/Accounts/Info/' + id)
    // .pipe((error) => { console.error(this.handleHttpError(error)) }); // Verwende die ausgelagerte handleError
  }

  public addAccount(httpClient: HttpClient): Observable<IAccount> {
    return httpClient.post<IAccount>('https://localhost:5001/api/Accounts', this.newAccount)
    // .pipe((error) => { console.error(this.handleHttpError(error)) }); // Verwende die ausgelagerte handleError  
  }

  public editAccount(httpClient: HttpClient, id: number, editedAccount: IAccount): Observable<IAccount> {
    return httpClient.put<IAccount>('https://localhost:5001/api/Accounts/' + id, editedAccount)
    // .pipe((error) => { console.error(this.handleHttpError(error)) }); // Verwende die ausgelagerte handleError
  }

  public deleteAccount(httpClient: HttpClient, id: number): Observable<IAccount> {
    return httpClient.delete<IAccount>('https://localhost:5001/api/Accounts/' + id)
      // .pipe(catchError(this.handleError())); // Verwende die ausgelagerte handleError
  }

  public login(httpClient: HttpClient, email: string, pw: string): Observable<IAccount> {
    const loginRequestData: ILoginRequestData = {
      mail: email,
      password: pw
    }

    console.log(JSON.stringify(loginRequestData));
    
    return httpClient.post<IAccount>('https://localhost:5001/api/Accounts/Login', loginRequestData)
  }

  public forgotPassword(httpClient: HttpClient, email: string): Observable<IForgotPassword> {
    let headers = new HttpHeaders({ 
      'accept': 'text/plain'
    })
    return httpClient.get<IForgotPassword>('https://localhost:5001/api/Accounts/Reset-Password/' + email, { headers })
  }





  // private handleError(error: any) {
  //   let errorMessage = '';
  
  //   if (error.status === 0) {
  //     // Ein Netzwerkfehler ist aufgetreten (Server nicht erreichbar)
  //     errorMessage = `Network Error: Unable to connect to the server. Possible causes could be: 
  //                     - The server is down
  //                     - CORS issues 
  //                     - Network connection is lost`;
  //     console.error(`[Network Error] Details:`, {
  //       error,
  //       suggestion: 'Check if the backend server is running and accessible.',
  //       urlAttempted: error.url,
  //     });
  //   } else if (error.status >= 400 && error.status < 500) {
  //     // Client-seitiger Fehler (4xx)
  //     switch (error.status) {
  //       case 400:
  //         errorMessage = `Bad Request: The server could not understand the request due to invalid syntax.`;
  //         console.error(`[Bad Request] Details:`, {
  //           error,
  //           suggestion: 'Check the request syntax and ensure all required parameters are correct.',
  //           urlAttempted: error.url,
  //           requestBody: error.error,
  //         });
  //         break;
  //       case 401:
  //         errorMessage = `Unauthorized: You are not authorized to access this resource.`;
  //         console.error(`[Unauthorized] Details:`, {
  //           error,
  //           suggestion: 'Make sure that you are logged in and have the correct authorization token.',
  //           attemptedUrl: error.url,
  //           headers: error.headers,
  //         });
  //         break;
  //       case 403:
  //         errorMessage = `Forbidden: You do not have permission to access this resource.`;
  //         console.error(`[Forbidden] Details:`, {
  //           error,
  //           suggestion: 'Check your user permissions or contact an administrator.',
  //           urlAttempted: error.url,
  //         });
  //         break;
  //       case 404:
  //         errorMessage = `Not Found: The requested resource could not be found on the server.`;
  //         console.error(`[Not Found] Details:`, {
  //           error,
  //           suggestion: 'Verify that the URL is correct and the resource exists.',
  //           urlAttempted: error.url,
  //         });
  //         break;
  //       default:
  //         errorMessage = `Client Error: HTTP status ${error.status} - ${error.message}`;
  //         console.error(`[Client Error] Details:`, {
  //           error,
  //           urlAttempted: error.url,
  //           requestBody: error.error,
  //         });
  //         break;
  //     }
  //   } else if (error.status >= 500) {
  //     // Server-seitiger Fehler (5xx)
  //     switch (error.status) {
  //       case 500:
  //         errorMessage = `Internal Server Error: The server encountered an unexpected condition.`;
  //         console.error(`[Server Error] Details:`, {
  //           error,
  //           suggestion: 'Check the server logs for more information.',
  //           urlAttempted: error.url,
  //         });
  //         break;
  //       case 502:
  //         errorMessage = `Bad Gateway: The server was acting as a gateway or proxy and received an invalid response from the upstream server.`;
  //         console.error(`[Bad Gateway] Details:`, {
  //           error,
  //           suggestion: 'Check if the upstream server is running correctly.',
  //           urlAttempted: error.url,
  //         });
  //         break;
  //       case 503:
  //         errorMessage = `Service Unavailable: The server is not ready to handle the request.`;
  //         console.error(`[Service Unavailable] Details:`, {
  //           error,
  //           suggestion: 'The server might be down or overloaded. Try again later.',
  //           urlAttempted: error.url,
  //         });
  //         break;
  //       case 504:
  //         errorMessage = `Gateway Timeout: The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.`;
  //         console.error(`[Gateway Timeout] Details:`, {
  //           error,
  //           suggestion: 'Check if the upstream service is responsive.',
  //           urlAttempted: error.url,
  //         });
  //         break;
  //       default:
  //         errorMessage = `Server Error: HTTP status ${error.status} - ${error.message}`;
  //         console.error(`[Server Error] Details:`, {
  //           error,
  //           urlAttempted: error.url,
  //           suggestion: 'Check server logs for more information.',
  //         });
  //         break;
  //     }
  //   }
  
  //   // Logge den Fehler und wirf ihn zurück, damit er weiter behandelt werden kann
  //   return throwError(() => new Error(`${errorMessage}. Please check the logs for more details.`));
  // }
  
}
