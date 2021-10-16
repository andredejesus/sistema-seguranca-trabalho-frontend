import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CabecalhoChecklist, Checklist} from '../models/checklist';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  apiURL: string = 'api/checklist';

  constructor(private http: HttpClient) { }


  salvaChecklist(cabecalhoChecklistDTO: CabecalhoChecklist): Observable<any>{
    return this.http.post<CabecalhoChecklist>(`${environment.API}/${this.apiURL}/salvaChecklist`, cabecalhoChecklistDTO);
  }

  listaCabecalhos(): Observable<any>{
    return this.http.get<CabecalhoChecklist>(`${environment.API}/${this.apiURL}/listaCabecalhos`)
  }

  listaChecklists(idCabecalho): Observable<any>{
    return this.http.get<Checklist>(`${environment.API}/${this.apiURL}/listaChecklists/${idCabecalho}`)
  }

}
