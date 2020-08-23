import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Exame, Aso } from './../../../controller/models/aso';
import { Colaborador } from 'src/app/seguranca-trabalho/controller/models/colaborador';
import { ColaboradorService } from './../../../controller/service/colaborador.service';
import { AsoService } from './../../../controller/service/aso.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as moment from 'moment';
import { AlertaSucessoComponent } from 'src/app/seguranca-trabalho/controller/alertas/alerta-sucesso/alerta-sucesso.component';
import { AlertaErroComponent } from 'src/app/seguranca-trabalho/controller/alertas/alerta-erro/alerta-erro.component';
import { AlertService } from 'src/app/controller/service/alert.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-aso-form',
  templateUrl: './aso-form.component.html',
  styleUrls: ['./aso-form.component.css']
})
export class AsoFormComponent implements OnInit {

  @ViewChild('modalExames', {static: false}) templateModalExames;

  metodosModalRef: BsModalRef;

  examesTemporarios: Exame[] = [];
  exame: Exame = new Exame();
  colaboradores: Colaborador [] = [];

  aso: Aso = new Aso();

  constructor(private modalService: BsModalService,
              private colaboradorService: ColaboradorService,
              private asoService: AsoService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private router: Router) {
                 this.route.params.subscribe(params => this.aso.id = params['id'])
               }

  ngOnInit(): void {
    this.exame = new Exame();

    this.colaboradorService.listaColaboradores().subscribe(res => this.colaboradores = res);
    
    if(this.aso.id != null){
      this.buscaAsoPorId();
    }
    
  }

  calculaDiasVencimentoAso(){
    if(this.aso.data_emissao != null && this.aso.dias_vencimento != null){
      const dataEmissao = moment(this.aso.data_emissao);
      dataEmissao.add(this.aso.dias_vencimento, 'days');
      this.aso.data_vencimento = dataEmissao.format('YYYY-MM-DD');
    }
    
  }

  salvarAso(){

    if(this.aso.id === null){

      this.asoService.salvarAso(this.aso).subscribe(

        res =>{
          this.salvarExame(res.id);
          this.examesTemporarios = [];
          this.alertService.success('Aso cadastrado com sucesso!');
        },
        erroResponse => {
          this.alertService.error('Ocorreu um erro ao salvar o aso!');
          console.log('Ocorreu um erro ao salvar o aso: ', erroResponse);
        }
  
      ); 

    }else{
      this.asoService.alteraAso(this.aso).subscribe(
        res =>{
            this.alteraExame(res.id);
            this.examesTemporarios = [];
            this.router.navigateByUrl('aso-list');
            this.alertService.success('Aso editado com sucesso!');
        },
        erroResponse => {
          this.alertService.error('Ocorreu um erro ao editar o aso:');
          console.log('Ocorreu um erro ao salvar o aso: ', erroResponse);
        }
      );
    }

  }

  salvarExame(id:number){

    this.examesTemporarios.forEach(itemLista => {
      itemLista.id_aso = id;

      this.asoService.salvarExame(itemLista).subscribe(
        res =>{
          console.log('Exames cadastrados com sucesso! ', res);
        },
        erroResponse => {
          console.log('Erro ao  cadastrar exames: ', erroResponse);
        });

  })

  }

  alteraExame(id:number){

    this.examesTemporarios.forEach(itemLista => {
      itemLista.id_aso = id;

      this.asoService.salvarExame(itemLista).subscribe(
        res =>{
          console.log('Exames alterados com sucesso! ', res);
        },
        erroResponse => {
          console.log('Erro ao  cadastrar exames: ', erroResponse);
        });

  })

  }

  abrirModal(){
    this.exame = new Exame();
    this.metodosModalRef = this.modalService.show(this.templateModalExames, {class: 'modal-sm-6'});
  }

  incluirExame(){
    this.examesTemporarios.push(this.exame);
    this.FecharModal();
  }

  deletarExame(exame){

    const index = this.examesTemporarios.indexOf(exame);
      if(index > -1){
        this.examesTemporarios.splice(index, 1);
      }
      
  }

  FecharModal(){
    this.metodosModalRef.hide();
  }

  buscaAsoPorId(){
    
    this.asoService.buscaAsoPorId(this.aso.id).subscribe(res => this.aso = res);
    this.asoService.buscaExamesPorAso(this.aso.id).subscribe(res => this.examesTemporarios = res);
  }

}
