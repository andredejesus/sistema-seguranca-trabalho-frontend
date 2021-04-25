import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Checklist, DadosChecklist } from './../../../controller/models/checklist';

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.css']
})
export class ChecklistFormComponent implements OnInit {

  dadosChecklist: DadosChecklist = new DadosChecklist();
  checklist: Checklist = new Checklist();
  checklistTemporario: Checklist[] = [];

  metodosModalRef: BsModalRef;

  @ViewChild('modalChecklist', {static: false}) templateModalChecklist;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  abrirModal(){
    this.checklist = new Checklist();
    this.metodosModalRef = this.modalService.show(this.templateModalChecklist, {class: 'modal-sm-6'});
  }

  FecharModal(){
    this.metodosModalRef.hide();
  }

  adicionarChecklist(){

    this.checklistTemporario.push(this.checklist);
    this.metodosModalRef.hide();
    
  }

  salvaChecklist(){

    this.dadosChecklist.checklists = this.checklistTemporario;

    console.log('Checklist: ' + JSON.stringify(this.dadosChecklist));

  }



}
