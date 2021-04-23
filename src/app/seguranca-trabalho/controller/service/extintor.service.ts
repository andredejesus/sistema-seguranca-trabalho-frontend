import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { Extintor, FiltroExtintorDTO } from './../models/extintor';


@Injectable({
  providedIn: 'root'
})
export class ExtintorService {

  apiURL: string = 'api/extintor';

  constructor(private http: HttpClient) { }

  salvaExtintor(extintor):Observable<any>{
    return this.http.post<Extintor>(`${environment.API}/${this.apiURL}`, extintor);
  }

  listaExtintores(): Observable<any>{
    return this.http.get<Extintor>(`${environment.API}/${this.apiURL}`);
  }

  buscaExtintorPorId(id: number): Observable<any>{
    return this.http.get<Extintor>(`${environment.API}/${this.apiURL}/${id}`);
  }

  alteraExtintor(id: number, extintor: Extintor): Observable<any>{
    return this.http.put<Extintor>(`${environment.API}/${this.apiURL}/${id}`, extintor);
  }

  deletaExtintor(id: number):Observable<any>{
    return this.http.delete<Extintor>(`${environment.API}/${this.apiURL}/${id}`);
  }

  filtroExtintor(filtroExtintor: FiltroExtintorDTO):Observable<any>{
    return this.http.post<FiltroExtintorDTO>(`${environment.API}/${this.apiURL}/filtro`, filtroExtintor);
  }

}
