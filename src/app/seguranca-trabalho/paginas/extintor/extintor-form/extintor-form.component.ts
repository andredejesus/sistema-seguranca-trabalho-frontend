import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Extintor } from 'src/app/seguranca-trabalho/controller/models/extintor';
import { ExtintorService } from 'src/app/seguranca-trabalho/controller/service/extintor.service'
import { UtilService } from 'src/app/controller/service/util.service'


@Component({
  selector: 'app-extintor-form',
  templateUrl: './extintor-form.component.html',
  styleUrls: ['./extintor-form.component.css']
})
export class ExtintorFormComponent implements OnInit {

  extintor: Extintor = new Extintor();

  constructor(private extintorService: ExtintorService,
              private utilService: UtilService) { }


  ngOnInit(): void {

  }

  calcularVencimentoExtintor(){

    this.extintor.data_vencimento = this.utilService.calculaVencimento(this.extintor.data_recarga, this.extintor.dias_vencimento).toString();
     
  }

  salvaExtintor(){
    this.extintorService.salvaExtintor(this.extintor).subscribe(
      res => {
        alert('Extintor salvo com sucesso!')
      }, 
      erroResponse =>{
        alert('Erro ao salvar Extintor! ')
      }
    );
  }

}
