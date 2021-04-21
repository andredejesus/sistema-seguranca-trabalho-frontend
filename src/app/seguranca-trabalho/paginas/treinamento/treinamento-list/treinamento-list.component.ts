import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertaErroComponent } from 'src/app/controller/alertas/alerta-erro/alerta-erro.component';
import { AlertService } from 'src/app/controller/service/alert.service';
import { AlertaSucessoComponent } from 'src/app/seguranca-trabalho/controller/alertas/alerta-sucesso/alerta-sucesso.component';
import { Colaborador, FiltroColaboradorDTO } from 'src/app/seguranca-trabalho/controller/models/colaborador';
import { FiltroTreinamentoDTO, Treinamento } from 'src/app/seguranca-trabalho/controller/models/treinamento';
import { ColaboradorService } from 'src/app/seguranca-trabalho/controller/service/colaborador.service';
import { TreinamentoService } from 'src/app/seguranca-trabalho/controller/service/treinamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-treinamento-list',
  templateUrl: './treinamento-list.component.html',
  styleUrls: ['./treinamento-list.component.css']
})
export class TreinamentoListComponent implements OnInit {


  treinamentos: Treinamento[];
  colaboradores: Colaborador[];
  colaboradorDetalhes: Colaborador = new Colaborador();
  filtroTreinamentoDto: FiltroTreinamentoDTO = new FiltroTreinamentoDTO();

  treinamento = new Treinamento();
  metodosModalRef: BsModalRef;

  @ViewChild('modalDadosDetalhados', {static: false}) templateModalDetalhe;

  constructor(private treinamentoService: TreinamentoService,
              private colaboradorService: ColaboradorService,
              private alertService: AlertService,
              private router: Router,
              private modalService: BsModalService,) { }

  ngOnInit(): void {
    this.buscaTreinamentos();
    this.buscaColaboradores();
    
  }

  buscaTreinamentos(){
    this.treinamentoService.buscaTreinamentos().subscribe(res =>{
      this.treinamentos = res
      this.verificaStatusTreinamento();
    }, error =>{
      console.log('Ocorreu um erro ao listar os treinamentos.');
    });
  }

  buscaColaboradores(){
    this.colaboradorService.listaColaboradores().subscribe(res =>{
      this.colaboradores = res;
    }, error => {
      console.log('Erro ao buscar os colaboradores.');
    });
  }

  buscaTreinamento(id){
    this.router.navigateByUrl('treinamento/' + id);
  }

  deletaTreinamento(id: number){
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Ao deletar não terá mais volta.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
    }).then((result) => {

      if (result.value) {
        Swal.fire(
          'Deletedo com sucesso!',
          '',
          'success'
        )

        this.treinamentoService.deletaTreinamento(id).subscribe(
          res =>{
            this.buscaTreinamentos();
          }
        );
        
      }
      
    })

  }

    //Faz os calculos de datas para verificar o status de cada exame
    verificaStatusTreinamento(){

      this.treinamentos.forEach(itemLista => {
        const dataAtual = moment().format("YYYY-MM-DD");
        
        //Verificar se a data atual está entre a data de emissão e a data de vencimento do aso
        const dataEstaValida = moment(dataAtual).isBetween(itemLista.data_treinamento, itemLista.data_vencimento);
       
        //Retiro uma quantidade de dias da data de vencimento do aso
        const periodoAvencer = moment(itemLista.data_vencimento).subtract(30, 'days');
        
        //Verifico se a data atual está entre o perído 'A Vencer' e a data de vencimento do aso
        const dataEstaPeriodoVencimento = moment(dataAtual).isBetween(periodoAvencer, this.treinamento.data_vencimento);
      
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

  buscaColaboradorPorId(idColaborador){

    this.colaboradorService.buscarColaborador(idColaborador).subscribe(
      res => {
          this.colaboradorDetalhes = res;

      }
    );

    this.metodosModalRef = this.modalService.show(this.templateModalDetalhe, {class: 'modal-sm-2'})

  }

  FecharModal(): void {
    this.metodosModalRef.hide();
  }

  filtroTreinamento(){
    this.treinamentoService.filtroTreinamento(this.filtroTreinamentoDto).subscribe(
      res =>{
        this.treinamentos = res;
        this.verificaStatusTreinamento();
        console.log('Filtro Treinamentos: ' + JSON.stringify(this.treinamentos));
        this.filtroTreinamentoDto = new FiltroTreinamentoDTO();
      },
      errorResponse =>{
        console.log('Ocorreu um erro ao retornar os dados... ' + errorResponse);
        
      }
    );
  }


}
