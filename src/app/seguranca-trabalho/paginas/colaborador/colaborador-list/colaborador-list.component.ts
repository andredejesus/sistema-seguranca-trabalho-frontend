import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ColaboradorService } from 'src/app/seguranca-trabalho/controller/service/colaborador.service';
import { Colaborador, DadosEmpresa } from 'src/app/seguranca-trabalho/controller/models/colaborador';
import { Router } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AlertaSucessoComponent } from 'src/app/seguranca-trabalho/controller/alertas/alerta-sucesso/alerta-sucesso.component';
import { AlertaErroComponent } from 'src/app/seguranca-trabalho/controller/alertas/alerta-erro/alerta-erro.component';


@Component({
  selector: 'app-colaborador-list',
  templateUrl: './colaborador-list.component.html',
  styleUrls: ['./colaborador-list.component.css'],
  
})
export class ColaboradorListComponent implements OnInit, OnDestroy {

  colaboradores: Colaborador [] = [];
  colaborador: Colaborador = new Colaborador();
  colaboradorDetalhes: Colaborador = new Colaborador();

  metodosModalRef: BsModalRef;

  inscricao: Subscription;

  @ViewChild(AlertaSucessoComponent, {static: false}) msgSucesso: AlertaSucessoComponent;
  @ViewChild(AlertaErroComponent, {static: false}) msgErro: AlertaErroComponent;

  @ViewChild('modalDeletar', {static: false}) templateModalDeletar;

  @ViewChild('modalDadosDetalhados', {static: false}) templateModalDetalhe;

  constructor(private colaboradorService: ColaboradorService,
              private router: Router,
              private modalService: BsModalService) { }

  ngOnInit() {
      this.listaColaboradores();

      this.colaborador.dadosEmpresa = new DadosEmpresa();
      this.colaboradorDetalhes.dadosEmpresa = new DadosEmpresa();
  }

  

  buscarColaborador(colaborador){
    this.router.navigateByUrl('colaboradores/' + colaborador.id);
    
  }

  abrirModal(id) {
    this.colaborador.id = id;
    this.metodosModalRef = this.modalService.show(this.templateModalDeletar, {class: 'modal-sm-6'});
  }

  confirmarDelecao(): void {
    this.inscricao = this.colaboradorService.deletarColaborador(this.colaborador.id).subscribe(
      res => {
          this.listaColaboradores();
          this.msgSucesso.setMsgSucesso('Colaborador deletado com sucesso!');
      },
      error =>{
        this.msgErro.setMsgErro('Ocorreu algum problema ao tentar deletr o colaborador.');
      }
    );

    this.metodosModalRef.hide();
  }
 
  FecharModal(): void {
    this.metodosModalRef.hide();
  }

  listaColaboradores(){
    this.inscricao = this.colaboradorService.listaColaboradores().subscribe(res => this.colaboradores = res);
  }


  abrirModalDetalhe(id){
    this.inscricao = this.colaboradorService.buscarColaborador(id).subscribe(res => this.colaboradorDetalhes = res);
    this.metodosModalRef = this.modalService.show(this.templateModalDetalhe, {class: 'modal-sm-2'})
  }

  filtroColaboradores(){
      this.colaboradorService.filtroColaboradores(this.colaborador.nome, 
                                                  this.colaborador.rg,
                                                  this.colaborador.cpf,
                                                  this.colaborador.data_nascimento,
                                                  this.colaborador.dadosEmpresa.data_admissao,
                                                  this.colaborador.dadosEmpresa.funcao,
                                                  this.colaborador.dadosEmpresa.departamento,
                                                  this.colaborador.dadosEmpresa.lotacao,
                                                  this.colaborador.dadosEmpresa.situacao).subscribe(
       res => this.colaboradores = res
      );
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

}
