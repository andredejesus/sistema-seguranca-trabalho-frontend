import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Exame, Aso } from './../../../controller/models/aso';
import { Colaborador } from 'src/app/seguranca-trabalho/controller/models/colaborador';
import { ColaboradorService } from './../../../controller/service/colaborador.service';
import { AsoService } from './../../../controller/service/aso.service';
import { AlertService } from 'src/app/controller/service/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from 'src/app/controller/service/util.service';


@Component({
  selector: 'app-aso-form',
  templateUrl: './aso-form.component.html',
  styleUrls: ['./aso-form.component.css']
})
export class AsoFormComponent implements OnInit {

  @ViewChild('modalExames', {static: false}) templateModalExames;

  metodosModalRef: BsModalRef;

  examesTemporarios: Exame[] = [];
  examesAdeletar: Exame[] = [];
  exame: Exame = new Exame();
  colaboradores: Colaborador [] = [];

  aso: Aso = new Aso();

  constructor(private modalService: BsModalService,
              private colaboradorService: ColaboradorService,
              private asoService: AsoService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private router: Router,
              private utilService: UtilService) {
                 this.route.params.subscribe(params => this.aso.id = params['id'])
               }

  ngOnInit(): void {
    this.exame = new Exame();

    //alert('Dados: ' + this.aso.id)

    this.colaboradorService.listaColaboradores().subscribe(res => this.colaboradores = res);
    
    if(this.aso.id != null){
      this.buscaAsoPorId();
    }
    
  }

  calculaDiasVencimentoAso(){
    this.aso.data_vencimento = this.utilService.calculaVencimento(this.aso.data_emissao, this.aso.dias_vencimento );
  }

  calculaDiasVencimentoExame(){
    this.exame.data_vencimento = this.utilService.calculaVencimento(this.exame.data_exame, this.exame.dias_vencimento );
  }

  salvarAso(){

    if(this.aso.id == undefined){

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

            if(this.examesAdeletar.length > 0){

              this.examesAdeletar.forEach(itemLista =>{
                  const exameDeletado = itemLista;
                  this.asoService.deletaExames(exameDeletado.id).subscribe();
              })

            }
          this.salvarExame(res.id);
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
        res =>{},
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
    
    //this.examesAdeletar.push(exame);

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
