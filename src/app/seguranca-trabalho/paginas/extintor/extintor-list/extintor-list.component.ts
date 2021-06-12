import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Colaborador } from 'src/app/seguranca-trabalho/controller/models/colaborador';
import { Extintor, FiltroExtintorDTO } from 'src/app/seguranca-trabalho/controller/models/extintor';
import { ExtintorService } from 'src/app/seguranca-trabalho/controller/service/extintor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-extintor-list',
  templateUrl: './extintor-list.component.html',
  styleUrls: ['./extintor-list.component.css']
})
export class ExtintorListComponent implements OnInit {

  colaboradores: Colaborador[];
  extintores: Extintor[];

  extintor: Extintor = new Extintor();

  filtroExtintor: FiltroExtintorDTO = new FiltroExtintorDTO();

  constructor(private extintorService: ExtintorService,
              private router: Router,) { }

  ngOnInit(): void {

    this.listaExtintores();
    
  }

  listaExtintores(){

    this.extintorService.listaExtintores().subscribe(
      res =>{
        this.extintores = res
        this.verificaStatusExtintor();
    }), 
    errorResponse =>{
      console.log('Ocorreu um erro ao listar os extintores: ' + errorResponse)
    };

  }

  redirecionaParaEdicao(id: number){
    this.router.navigateByUrl('extintor/'+id);
  }

  deletaExtintor(id: number){

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
  
          this.extintorService.deletaExtintor(id).subscribe(
            res => {
                this.listaExtintores();
            });
          
        }
        
      })


  }

  verificaStatusExtintor(){

    this.extintores.forEach(itemLista => {
      const dataAtual = moment().format("YYYY-MM-DD");
      
      //Verificar se a data atual está entre a data de recarga e a data de vencimento do extintor
      const dataEstaValida = moment(dataAtual).isBetween(itemLista.data_recarga, itemLista.data_vencimento);
     
      //Retiro uma quantidade de dias da data de vencimento do extintor
      const periodoAvencer = moment(itemLista.data_vencimento).subtract(30, 'days');
      
      //Verifico se a data atual está entre o perído 'A Vencer' e a data de vencimento do aso
      const dataEstaPeriodoVencimento = moment(dataAtual).isBetween(periodoAvencer, this.extintor.data_vencimento);
    
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

  filtroExtintores(){
    this.extintorService.filtroExtintor(this.filtroExtintor).subscribe(
      res =>{
        this.extintores = res;
        this.verificaStatusExtintor();
        this.filtroExtintor = new FiltroExtintorDTO();
        console.log('Filtro Extintores: ' + JSON.stringify(this.extintores));
      }, 
      errorResponse =>{
        console.log('Ocorreu um erro ao tentar realizar o filtro de extintores: ' + errorResponse);
      }
    );
  }


  gerarCSV(){

    this.extintorService.gerarCSV().subscribe(
      res =>{
        
        this.extintorService.downloadArquivosUtil(res)
    }), 
    errorResponse =>{
      console.log('Ocorreu um erro ao listar os extintores: ' + errorResponse)
    };

  }

}
