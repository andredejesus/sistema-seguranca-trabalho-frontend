import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { FiltroTreinamentoDTO, Treinamento } from '../models/treinamento';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TreinamentoService {

  apiURL: string = 'api/treinamento';

  constructor(private http: HttpClient) { }

  salvarTreinamento(treinamento: Treinamento): Observable<any>{
    return this.http.post<Treinamento>(`${environment.API}/${this.apiURL}`, treinamento);
  }

  buscaTreinamentos():Observable<any>{
      return this.http.get<Treinamento>(`${environment.API}/${this.apiURL}`);
  }

  editaTreinamento(treinamento: Treinamento):Observable<any>{
    return this.http.put<Treinamento>(`${environment.API}/${this.apiURL}/${treinamento.id}`, treinamento );
  }

  buscaTreinamento(id):Observable<any>{
    return this.http.get<Treinamento>(`${environment.API}/${this.apiURL}/${id}`);
  }

  deletaTreinamento(id):Observable<any>{
    return this.http.delete<Treinamento>(`${environment.API}/${this.apiURL}/${id}`);
  }

  filtroTreinamento(filtroDto: FiltroTreinamentoDTO):Observable<any>{
    return this.http.post<FiltroTreinamentoDTO>(`${environment.API}/${this.apiURL}/filtro`, filtroDto);
  }


}
