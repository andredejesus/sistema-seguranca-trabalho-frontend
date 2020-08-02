import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { take } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenUrl: string = `${environment.API}` + `${environment.obterTokenUrl}`;
  clientId: string = `${environment.clientId}`;
  clientSecret: string = `${environment.clientSecret}`;

  constructor(private http: HttpClient) { }

  tentarLogar(username: string, password: string){

    const params = new HttpParams()
                  .set('username', username)
                  .set('password', password)
                  .set('grant_type', 'password')

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return this.http.post(this.tokenUrl, params.toString(), { headers } ).pipe(take(1))
  }
}
