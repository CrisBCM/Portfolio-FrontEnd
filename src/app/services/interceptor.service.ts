import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AutenticationService} from './autentication.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private autenticacionServicio: AutenticationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var currentUser = this.autenticacionServicio.UsuarioAutenticado;
    if(currentUser && currentUser.accessToken)
    {
      req = req.clone({
        setHeaders:{
          Authorization: `Bearer ${currentUser.token}`
        }
      })
    }
    console.log("Interceptor esta corriendo!");
    return next.handle(req);
  }
}
