import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DAUM_MAP_API_KEY } from '../config';

@Injectable()
export class JwtHttpInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');
    let full_token = request.headers.get('authorization');
    
    //ie일 경우 headers authorization이 null값으로 온다.
    if(!full_token){
      if(request.url.includes('kakao')) full_token = `KakaoAK ${DAUM_MAP_API_KEY}`;
      else full_token = `Bearer ${token}`;
    }
    let clone: HttpRequest<any>;
    if (token) {
      clone = request.clone({
        setHeaders: {
          Accept: `application/json`,
          Authorization: full_token,
        },
        url: encodeURI(request.urlWithParams)
      });
    } else {
      clone = request.clone({
        setHeaders: {
          Accept: `application/json`,
        },
        url: encodeURI(request.urlWithParams)
      });
    }
    return next.handle(clone);
  //   return false;
  }
}