import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenUrl: string = `${environment.API}` + `${environment.obterTokenUrl}`;
  clientId: string = `${environment.clientId}`;
  clientSecret: string = `${environment.clientSecret}`;

  jwtHelper: JwtHelperService = new JwtHelperService();
  

  constructor(private http: HttpClient, private router: Router) { }

    obterToken(){
      const tokenString = localStorage.getItem('access_token');
      if(tokenString){
        const token = JSON.parse(tokenString).access_token
        return token;
      }
      return null;
    }

    encerrarSessao(){
      localStorage.removeItem('access_token');
      this.router.navigateByUrl('/login');
    }

    obterDadosUsuarioAutenticado(){
      const token = this.obterToken();
      if(token){
        const usuario = this.jwtHelper.decodeToken(token).user_name
        return usuario;
      }
      return null;
    }

    verificarAutenticacao() : boolean{
      const token = this.obterToken();

      if(token){
        const expired = this.jwtHelper.isTokenExpired(token)
        return true;
      }

      return false;
    }

  tentarLogar(username: string, password: string) : Observable<any>{

    const params = new HttpParams()
                  .set('username', username)
                  .set('password', password)
                  .set('grant_type', 'password')

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return this.http.post<any>(this.tokenUrl, params.toString(), { headers } );
  }
}
