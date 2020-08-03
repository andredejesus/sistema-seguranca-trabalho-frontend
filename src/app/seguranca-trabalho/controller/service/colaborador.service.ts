import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Colaborador } from '../models/colaborador';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  //testeURL = 'https://sast-backend-test.herokuapp.com';

  
  apiURL: string = 'api/colaboradores';


  constructor(private http: HttpClient) { }

  listaColaboradores(): Observable<any> {
    return this.http.get<Colaborador[]>(`${environment.API}/${this.apiURL}`);
  }

  salvarColaborador(colaboradores: Colaborador) : Observable<Colaborador> {
    return this.http.post<Colaborador>(`${environment.API}/${this.apiURL}`, colaboradores);
  }

  buscarColaborador(id: number): Observable<Colaborador> {
    return this.http.get<Colaborador>(`${environment.API}/${this.apiURL}/${id}`);
  }

  editarColaborador(colaborador: Colaborador) : Observable<Colaborador> {
    return this.http.put<Colaborador>(`${environment.API}/${this.apiURL}`, colaborador);
  }

  deletarColaborador(id: number): Observable<Colaborador> {
    return this.http.delete<Colaborador>(`${environment.API}/${this.apiURL}/${id}`);
  }

  filtroColaboradores(nome: string, rg: string, cpf: string, data_nascimento: string, data_admissao: string, funcao:string, departamento:string, lotacao:string, situacao:string): Observable<any> {
    return this.http.get<Colaborador[]>(`${environment.API}/${this.apiURL}/filtro?nome=${nome}&rg=${rg}&cpf=${cpf}&data_nascimento=${data_nascimento}&data_admissao=${data_admissao}&funcao=${funcao}&departamento=${departamento}&lotacao=${lotacao}&situacao=${situacao}`);
  }

}
