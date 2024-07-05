import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler){
    console.log(request.url)
    const modifiedRequest = request.clone({
      headers:request.headers.append(
        'AUTH','AA'
      )
    })
    console.log("checking the interceptor")
    return next.handle(modifiedRequest);
  }
}
