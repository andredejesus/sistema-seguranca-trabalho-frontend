import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Colaborador } from '../models/colaborador';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/Operators';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  //testeURL = 'https://sast-backend-test.herokuapp.com';

  
  apiURL: string = '/api/colaboradores';


  constructor(private http: HttpClient) { }

  listaColaboradores(): Observable<any> {

    const tokenString = localStorage.getItem('access_token');
    const token = JSON.parse(tokenString);

    const headers = {
      'Authorization': 'Bearer' + token.access_token
    }

    return this.http.get<Colaborador[]>(`${this.apiURL}`, {headers});
  }

  salvarColaborador(colaboradores: Colaborador) : Observable<Colaborador> {

    const tokenString = localStorage.getItem('access_token');
    const token = JSON.parse(tokenString);
    const headers = {
      'Authorization': 'Bearer' + token.access_token
    }

    return this.http.post<Colaborador>(`${this.apiURL}`, colaboradores, {headers});
  }

  buscarColaborador(id: number): Observable<Colaborador> {
    const tokenString = localStorage.getItem('access_token');
    const token = JSON.parse(tokenString);
    const headers = {
      'Authorization': 'Bearer' + token.access_token
    }
    return this.http.get<Colaborador>(`${this.apiURL}/${id}`, {headers});
  }

  editarColaborador(colaborador: Colaborador) : Observable<Colaborador> {
    const tokenString = localStorage.getItem('access_token');
    const token = JSON.parse(tokenString);
    const headers = {
      'Authorization': 'Bearer' + token.access_token
    }
    return this.http.put<Colaborador>(`${this.apiURL}`, colaborador, {headers});
  }

  deletarColaborador(id: number) {
    return this.http.delete<Colaborador>(`${this.apiURL}/${id}`).pipe(take(1));
  }

  filtroColaboradores(nome: string, rg: string, cpf: string, data_nascimento: string, data_admissao: string, funcao:string, departamento:string, lotacao:string, situacao:string): Observable<any> {
    return this.http.get<Colaborador[]>(`${this.apiURL}/colaboradores/filtro?nome=${nome}&rg=${rg}&cpf=${cpf}&data_nascimento=${data_nascimento}&data_admissao=${data_admissao}&funcao=${funcao}&departamento=${departamento}&lotacao=${lotacao}&situacao=${situacao}`);
  }

}
