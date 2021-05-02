import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertService } from 'src/app/controller/service/alert.service';
import { Checklist, ChecklistDTO, DadosChecklist } from './../../../controller/models/checklist';
import { ChecklistService} from './../../../controller/service/checklist.service';

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.css']
})
export class ChecklistFormComponent implements OnInit {

  dadosChecklist: DadosChecklist = new DadosChecklist();
  checklist: Checklist = new Checklist();
  checklistTemporario: Checklist[] = [];

  checklistDTO: ChecklistDTO = new ChecklistDTO();

  metodosModalRef: BsModalRef;

  @ViewChild('modalChecklist', {static: false}) templateModalChecklist;

  constructor(private modalService: BsModalService, 
              private checklistService: ChecklistService,
              private alertService: AlertService) { }

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

    this.checklistDTO.checklists = this.checklistTemporario;
    this.checklistDTO.cabecalhoChecklist = this.dadosChecklist;
    
    this.checklistService.salvaChecklist(this.checklistDTO).subscribe(
      
      response =>{

        if(!response.temErro){

          this.alertService.success('Checklist salvo com sucesso!');
          console.log('LOG: ' + JSON.stringify(response));

        }
        
      }, 
      
      responseError =>{
        
        if(responseError.error.temErro){

          this.alertService.error(responseError.error.msgsErro[0], 'Atenção!')
          console.log('LOG: ' + JSON.stringify(responseError.error.msgsErro[0]));
          
        }

      }
    );

  }



}
