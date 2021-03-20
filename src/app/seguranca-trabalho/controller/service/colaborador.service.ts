import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Colaborador, FiltroColaboradorDTO } from '../models/colaborador';
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

  filtroColaboradores(filtroColaborador: FiltroColaboradorDTO): Observable<any> {
    return this.http.post<FiltroColaboradorDTO[]>(`${environment.API}/${this.apiURL}/filtro`, filtroColaborador);
  }

}
