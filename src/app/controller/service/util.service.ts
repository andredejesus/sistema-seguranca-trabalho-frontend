import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  calculaVencimento(data_cadastro, dias_vencimento ){

    if(data_cadastro != null && dias_vencimento != null){
      const dataVencimento = moment(data_cadastro);
      dataVencimento.add(dias_vencimento, 'days');
      const data = dataVencimento.format('YYYY-MM-DD');
      return data;
    }

}


}