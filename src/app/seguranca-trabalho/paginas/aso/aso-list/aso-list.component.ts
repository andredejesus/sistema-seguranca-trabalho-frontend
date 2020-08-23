import { Component, OnInit, ViewChild } from '@angular/core';
import { Aso } from 'src/app/seguranca-trabalho/controller/models/aso';
import { AsoService } from './../../../controller/service/aso.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Exame } from './../../../controller/models/aso';
import * as moment from 'moment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aso-list',
  templateUrl: './aso-list.component.html',
  styleUrls: ['./aso-list.component.css']
})
export class AsoListComponent implements OnInit {

  listaDeAso: Aso [] = [];
  examesPorAso: Exame [] = [];
  aso: Aso = new Aso();

  status:boolean

  metodosModalRef: BsModalRef;

  inscricao: Subscription;

  @ViewChild('modalExames', {static:false}) templateModalExames;

  constructor(private asoService: AsoService,
              private modalService: BsModalService,
              private router: Router) { }

  ngOnInit(): void {

    this.inscricao = this.asoService.listaAso().subscribe(res => {
      this.listaDeAso = res
      this.verificaStatus();
    });
    this.verificaStatus();
  }

  //Faz os calculos de datas para verificar o status de cada aso
  verificaStatus(){

      this.listaDeAso.forEach(itemLista => {
        const dataAtual = moment().format("YYYY-MM-DD");

        //Verificar se a data atual está entre a data de emissão e a data de vencimento do aso
        const dataEstaValida = moment(dataAtual).isBetween(itemLista.data_emissao, itemLista.data_vencimento);
        
        //Retiro uma quantidade de dias da data de vencimento do aso
        const peridoAvencer = moment(itemLista.data_vencimento).subtract(12, 'days');

        //Verifico se a data atual está entre o perído 'A Vencer' e a data de vencimento do aso
        const dataEstaPeriodoVencimento = moment(dataAtual).isBetween(peridoAvencer, this.aso.data_vencimento);

       if(dataEstaValida === true){
        itemLista.situacao = 'Válido';
       }

       if(dataEstaPeriodoVencimento === true){
        itemLista.situacao = 'À Vencer';
       }
       
       if(dataEstaValida === false){
        itemLista.situacao = 'Vencido'
       }
        
      });
  }

  filtroAso(){

  }

  abrirModalExames(id_aso:number){
    this.metodosModalRef = this.modalService.show(this.templateModalExames, {class: 'modal-sm-6'});
    this.asoService.buscaExamesPorAso(id_aso).subscribe(res => this.examesPorAso = res);
  }

  fecharModal(): void {
    this.metodosModalRef.hide();
  }

  redirecionaFormAso(aso){
    this.router.navigateByUrl('aso/' + aso.id);
  }



}
