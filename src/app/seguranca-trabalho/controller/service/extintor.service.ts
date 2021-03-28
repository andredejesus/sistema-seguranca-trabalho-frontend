import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { Extintor } from './../models/extintor';


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

}
