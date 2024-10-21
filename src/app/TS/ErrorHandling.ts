import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

interface IHttpError {
  status: string,
  message: string,
  suggestion: string,
  urlAttempted: string,
}

export httpErrors: IHttpErrors

// NOT WORKING
export function handleHttpError(status: number): IHttpError {
    let errorMessage = '';
    let httpError: IHttpError = {
      status: "",
      message: "",
      suggestion: "",
      urlAttempted: ""
    }
  
    if (status === 0) {
      // Ein Netzwerkfehler ist aufgetreten (Server nicht erreichbar)
      errorMessage = `Network Error: Unable to connect to the server. Possible causes could be: \n
                      - The server is down\n
                      - CORS issues \n
                      - Network connection is lost`;

      httpError = {
        status: status,
        message: errorMessage,
        suggestion: 'Check if the backend server is running and accessible.',
        urlAttempted: error.url,
      }
      
      return httpError
    } else if (status >= 400 && status < 500) {
      // Client-seitiger Fehler (4xx)
      switch (status) {
        case 400:
          errorMessage = `Bad Request: The server could not understand the request due to invalid syntax.`;
          httpError = {
            status: status,
            message: errorMessage,
            suggestion: 'Check the request syntax and ensure all required parameters are correct.',
            urlAttempted: error.url,
          }
          
          return httpError
          break;
        case 401:
          errorMessage = `Unauthorized: You are not authorized to access this resource.`;
          httpError = {
            status: status,
            message: errorMessage,
            suggestion: 'Make sure that you are logged in and have the correct authorization token.',
            urlAttempted: error.url,
          }
          
          return httpError
          break;
        case 403:
          errorMessage = `Forbidden: You do not have permission to access this resource.`;
          httpError = {
            status: status,
            message: errorMessage,
            suggestion: 'Check your user permissions or contact an administrator.',
            urlAttempted: error.url,
          }
          
          return httpError
        case 404:
          errorMessage = `Not Found: The requested resource could not be found on the server.`;
          httpError = {
            status: status,
            message: errorMessage,
            suggestion: 'Verify that the URL is correct and the resource exists.',
            urlAttempted: error.url,
          }
          
          return httpError
          break;
        default:
          errorMessage = `Client Error: HTTP status ${status} - ${error.message}`;
          httpError = {
            status: status,
            message: errorMessage,
            suggestion: '',
            urlAttempted: error.url,
          }
          
          return httpError
          break;
      }
    } else if (status >= 500) {
      // Server-seitiger Fehler (5xx)
      switch (status) {
        case 500:
          errorMessage = `Internal Server Error: The server encountered an unexpected condition.`;
          httpError = {
            status: status,
            message: errorMessage,
            suggestion: 'Check the server logs for more information.',
            urlAttempted: error.url,
          }
          
          return httpError
          break;
        case 502:
          errorMessage = `Bad Gateway: The server was acting as a gateway or proxy and received an invalid response from the upstream server.`;
          httpError = {
            status: status,
            message: errorMessage,
            suggestion: 'Check if the upstream server is running correctly.',
            urlAttempted: error.url,
          }
          
          return httpError
          break;
        case 503:
          errorMessage = `Service Unavailable: The server is not ready to handle the request.`;
          httpError = {
            status: status,
            message: errorMessage,
            suggestion: 'The server might be down or overloaded. Try again later.',
            urlAttempted: error.url,
          }
          
          return httpError
          break;
        case 504:
          errorMessage = `Gateway Timeout: The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.`;
          httpError = {
            status: status,
            message: errorMessage,
            suggestion: 'Check if the upstream service is responsive.',
            urlAttempted: error.url,
          }
          
          return httpError
          break;
        default:
          errorMessage = `Server Error: HTTP status ${status} - ${error.message}`;
          httpError = {
            status: status,
            message: errorMessage,
            suggestion: 'Check server logs for more information.',
            urlAttempted: error.url,
          }
          
          return httpError
          break;
      }

    }
}