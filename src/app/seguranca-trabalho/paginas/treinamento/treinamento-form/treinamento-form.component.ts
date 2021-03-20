import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { AlertService } from 'src/app/controller/service/alert.service';
import { Colaborador } from 'src/app/seguranca-trabalho/controller/models/colaborador';
import { Treinamento } from 'src/app/seguranca-trabalho/controller/models/treinamento';
import { ColaboradorService } from 'src/app/seguranca-trabalho/controller/service/colaborador.service';
import { TreinamentoService } from 'src/app/seguranca-trabalho/controller/service/treinamento.service';


@Component({
  selector: 'app-treinamento-form',
  templateUrl: './treinamento-form.component.html',
  styleUrls: ['./treinamento-form.component.css']
})
export class TreinamentoFormComponent implements OnInit {

  colaboradores: Colaborador[]; 
  colaborador: Colaborador = new Colaborador();
  treinamento: Treinamento = new Treinamento();

  constructor(private colaboradorService: ColaboradorService,
              private treinamentoService: TreinamentoService,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private router: Router) {
                this.route.params.subscribe(params => this.treinamento.id = params['id']);
               }

  ngOnInit(): void {
    this.listaColaboradores();
    this.buscaTreinamento();
  }

  listaColaboradores(){
      this.colaboradorService.listaColaboradores().subscribe(res => {
        this.colaboradores = res
        console.log(this.colaboradores);
      });
  }

  calcularVencimentoTreinamento(){
    if(this.treinamento.data_treinamento != null && this.treinamento.dias_vencimento != null){
        const dataTreinamento = moment(this.treinamento.data_treinamento);
        dataTreinamento.add(this.treinamento.dias_vencimento, 'days')
        this.treinamento.data_vencimento = dataTreinamento.format('YYYY-MM-DD');
    }
  }

  salvarTreinamento(){

    if(this.treinamento.id == undefined){
      this.treinamentoService.salvarTreinamento(this.treinamento).subscribe(
        res => {
          this.alertService.success('Treinamento cadastrado com sucesso!');
          console.log(res);
        },
        erroResponse => {
          this.alertService.error('Ocorreu um erro ao salvar o treinamento!');
          console.log('Ocorreu um erro ao salvar o treinamento: ', erroResponse);
        }
      );
    }else{
      this.treinamentoService.editaTreinamento(this.treinamento).subscribe(
        res =>{
          this.alertService.success('Treinamento Editado com sucesso!')
          console.log(res);
          this.router.navigateByUrl('/treinamento-list');
      },erroResponse =>{
          this.alertService.error('Ocorreu um erro ao editar o treinamento!');
          console.log('Ocorreu um erro ao editar o treinamento! ', erroResponse);
      });
    }

  }

  buscaTreinamento(){
    if(this.treinamento.id != null || this.treinamento.id != undefined ){

      this.treinamentoService.buscaTreinamento(this.treinamento.id).subscribe(
        res => {
          this.treinamento = res;
          this.colaborador.nome = res.colaborador.nome;
          this.treinamento.id_colaborador = res.colaborador.id;
          console.log('Treinamento: ' + JSON.stringify(res));
        },
        erroResponse =>{
          this.alertService.error('Erro ao retornar o treinamento de ID: ' + this.treinamento.id, 'Atenção!');
          console.log('Ocorreu um erro ao retornar o treinamento! ', erroResponse);
        }
      );

    }

  }

}
