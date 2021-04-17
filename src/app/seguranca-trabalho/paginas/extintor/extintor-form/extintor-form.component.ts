import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Extintor } from 'src/app/seguranca-trabalho/controller/models/extintor';
import { ExtintorService } from 'src/app/seguranca-trabalho/controller/service/extintor.service'
import { UtilService } from 'src/app/controller/service/util.service'
import { AlertService } from 'src/app/controller/service/alert.service';
import { Colaborador } from 'src/app/seguranca-trabalho/controller/models/colaborador';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-extintor-form',
  templateUrl: './extintor-form.component.html',
  styleUrls: ['./extintor-form.component.css']
})
export class ExtintorFormComponent implements OnInit {

  extintor: Extintor = new Extintor();
  colaboradores: Colaborador[];

  idExtintor;

  constructor(private extintorService: ExtintorService,
              private utilService: UtilService,
              private alertService: AlertService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

                this.activatedRoute.params.subscribe(params => this.extintor.id = params['id']);

               }


  ngOnInit(): void {


    if(this.extintor.id != undefined){
      this.buscaExtintorPorId(this.extintor.id);
    }

  }

  calcularVencimentoExtintor(){

    this.extintor.data_vencimento = this.utilService.calculaVencimento(this.extintor.data_recarga, this.extintor.dias_vencimento).toString();
     
  }

  salvaExtintor(){

    if(this.extintor.id == undefined){

      this.extintorService.salvaExtintor(this.extintor).subscribe(
        res => {
          this.alertService.success('Extintor cadastrado com sucesso!');
          console.log(res);
        },
        erroResponse => {
          this.alertService.error('Ocorreu um erro ao salvar o extintor!');
          console.log('Ocorreu um erro ao salvar o extintor: ', erroResponse);
        }
      );

    }else{

      this.extintorService.alteraExtintor(this.extintor.id, this.extintor).subscribe(
        res =>{
          this.router.navigateByUrl('extintor-list');
        this.alertService.success('Extintor editado com sucesso!');
      }),
      errorResponse =>{
        this.alertService.error('Ocorreu um erro ao editar o extintor!');
        console.log('Ocorreu um erro ao editar o extintor: ', errorResponse);
      };

    }

    
  }

  buscaExtintorPorId(id: number){

    this.extintorService.buscaExtintorPorId(id).subscribe(res => {
      this.extintor = res;
    });

  }

}
