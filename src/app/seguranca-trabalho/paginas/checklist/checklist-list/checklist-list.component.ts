import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Checklist, ChecklistDTO, DadosChecklist } from 'src/app/seguranca-trabalho/controller/models/checklist';
import { ChecklistService } from 'src/app/seguranca-trabalho/controller/service/checklist.service';

@Component({
  selector: 'app-checklist-list',
  templateUrl: './checklist-list.component.html',
  styleUrls: ['./checklist-list.component.css']
})
export class ChecklistListComponent implements OnInit {


  checklistsDTO: ChecklistDTO[] = [];

  checklists: Checklist[] = [];

  listaCabecalhos: DadosChecklist[] = [];

  metodosModalRef: BsModalRef;

  @ViewChild('modalChecklists', {static: false}) modalChecklists;

  constructor(private checklistService: ChecklistService,
              private modalService: BsModalService,) { }

  ngOnInit(): void {
    this.listaChecklists();
  }

  listaChecklists(){
    this.checklistService.listaCabecalhos().subscribe(
      res =>{
        this.listaCabecalhos = res.listaCabecalhos;
        console.log(JSON.stringify(this.listaCabecalhos));
        //console.log(JSON.stringify(this.checklistsDTO));
      }, 
      resError =>{
        console.log('Ocorreu um erro ao listar os checklists');
      }
    );
  }

  FecharModal(): void {
    this.metodosModalRef.hide();
  }

  abrirModalChecklist(idCabecalho){

    this.checklistService.listaChecklists(idCabecalho).subscribe(
      res=>{
          this.checklists = res.checklists;
          console.log('CHECKLISTS: ' + JSON.stringify(this.checklists));
      }, 
      resError =>{
        console.log('Ocorreu um erro ao listar o checklist');
      }
    );

    this.metodosModalRef = this.modalService.show(this.modalChecklists, {class: 'modal-sm-12'})
  }

}
