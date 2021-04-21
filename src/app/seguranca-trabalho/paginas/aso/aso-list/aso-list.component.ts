import { Component, OnInit, ViewChild } from '@angular/core';
import { Aso, FiltroDTO } from 'src/app/seguranca-trabalho/controller/models/aso';
import { AsoService } from './../../../controller/service/aso.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Exame } from './../../../controller/models/aso';
import * as moment from 'moment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aso-list',
  templateUrl: './aso-list.component.html',
  styleUrls: ['./aso-list.component.css']
})
export class AsoListComponent implements OnInit {

  listaDeAso: Aso [] = [];
  examesPorAso: Exame [] = [];
  exame: Exame = new Exame();
  aso: Aso = new Aso();
  filtroDto = new FiltroDTO();

  status:boolean

  metodosModalRef: BsModalRef;

  inscricao: Subscription;

  @ViewChild('modalExames', {static:false}) templateModalExames;
  @ViewChild('modalDeletar', {static:false}) templateModalDeletar;

  constructor(private asoService: AsoService,
              private modalService: BsModalService,
              private router: Router) { }

  ngOnInit(): void {

    this.buscaAsos();
    this.verificaStatusAso();
    
  }

  buscaAsos(){
    this.inscricao = this.asoService.listaAso().subscribe(res => {
      this.listaDeAso = res
      this.verificaStatusAso();
    });
  }

  //Faz os calculos de datas para verificar o status de cada aso
  verificaStatusAso(){

      this.listaDeAso.forEach(itemLista => {
        const dataAtual = moment().format("YYYY-MM-DD");

        //Verificar se a data atual está entre a data de emissão e a data de vencimento do aso
        const dataEstaValida = moment(dataAtual).isBetween(itemLista.data_emissao, itemLista.data_vencimento);
        
        //Retiro uma quantidade de dias da data de vencimento do aso
        const peridoAvencer = moment(itemLista.data_vencimento).subtract(30, 'days');

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

  //Faz os calculos de datas para verificar o status de cada exame
  verificaStatusExame(){

    this.examesPorAso.forEach(itemLista => {
      const dataAtual = moment().format("YYYY-MM-DD");
      
      //Verificar se a data atual está entre a data de emissão e a data de vencimento do aso
      const dataEstaValida = moment(dataAtual).isBetween(itemLista.data_exame, itemLista.data_vencimento);
     
      //Retiro uma quantidade de dias da data de vencimento do aso
      const periodoAvencer = moment(itemLista.data_vencimento).subtract(30, 'days');
      
      //Verifico se a data atual está entre o perído 'A Vencer' e a data de vencimento do aso
      const dataEstaPeriodoVencimento = moment(dataAtual).isBetween(periodoAvencer, this.exame.data_vencimento);
    
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

    this.asoService.filtroAso(this.filtroDto).subscribe(
      res =>{
          this.listaDeAso = res;
          this.verificaStatusAso();
          console.log(JSON.stringify('Filtro Aso Retornado: ' + this.listaDeAso));
          this.filtroDto = new FiltroDTO();
      },
      errorResponse =>{
          console.log('Ocorreu algum erro ao retornar os dados do aso.' + errorResponse);
      }
    );

  }

  abrirModalExames(id_aso:number){
    
    this.metodosModalRef = this.modalService.show(this.templateModalExames, {class: 'modal-sm-6'});
    this.asoService.buscaExamesPorAso(id_aso).subscribe(res =>{
      this.examesPorAso = res
      this.verificaStatusExame();
    } )
  }

  abrirModalDeletar(id:number){
    this.metodosModalRef = this.modalService.show(this.templateModalDeletar, {class: 'modal-sm-6'});
  }

  fecharModal(): void {
    this.metodosModalRef.hide();
  }

  redirecionaFormAso(aso){
    this.router.navigateByUrl('aso/' + aso.id);
  }

  deletaAso(id: number){
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Ao deletar não terá mais volta.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.value) {
        Swal.fire(
          'Deletedo com sucesso!',
          '',
          'success'
        )

        this.asoService.deletaAso(id).subscribe(
          res =>{

            this.asoService.buscaExamesPorAso(id).subscribe(res => this.examesPorAso = res);

            console.log('Exames: ', this.examesPorAso);

            if(this.examesPorAso.length > 0){
              this.examesPorAso.forEach(itemLista =>{
                this.asoService.deletaExames(itemLista.id).subscribe();
              });
            }
            
            this.buscaAsos();
          });
      }
      
    })
  }



}
