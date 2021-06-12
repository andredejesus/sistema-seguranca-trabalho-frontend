import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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

  gerarCSV(): Observable<any>{
    return this.http.get<any>(`${environment.API}/${this.apiURL}/exportar-csv`, {responseType: 'blob' as 'json'});
  }

  downloadArquivosUtil(res: any){
    const file = new Blob([res], {
      type: res.type
    });

    // Internet Explorer
    if(window.navigator && window.navigator.msSaveOrOpenBlob){
      window.navigator.msSaveOrOpenBlob(file);
      return;
    }

    const blob = window.URL.createObjectURL(file);

    const link = document.createElement('a');
    link.href = blob;
    var dataArquivo = new Date();
    const filename = 'relatorio_extintores_' + dataArquivo.toISOString().substr(0, 10).split('-').reverse().join('_');
    link.download = filename+'.csv'

    //link.click();

    link.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));

    setTimeout(()=>{
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 100)
  }

}
