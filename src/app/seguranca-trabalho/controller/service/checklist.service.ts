import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Checklist, ChecklistDTO, DadosChecklist } from '../models/checklist';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  apiURL: string = 'api/checklist';

  constructor(private http: HttpClient) { }


  salvaChecklist(checklistDTO: ChecklistDTO): Observable<any>{
    return this.http.post<ChecklistDTO>(`${environment.API}/${this.apiURL}/salvaChecklist`, checklistDTO);
  }

  listaCabecalhos(): Observable<any>{
    return this.http.get<DadosChecklist>(`${environment.API}/${this.apiURL}/listaCabecalhos`)
  }

  listaChecklists(idCabecalho): Observable<any>{
    return this.http.get<Checklist>(`${environment.API}/${this.apiURL}/listaChecklists/${idCabecalho}`)
  }

}
