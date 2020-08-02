import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SegurancaTrabalhoRoutingModule } from './seguranca-trabalho-routing.module';
import { ColaboradorFormComponent } from './paginas/colaborador/colaborador-form/colaborador-form.component';
import { AsoComponent } from './paginas/aso/aso.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ColaboradorListComponent } from './paginas/colaborador/colaborador-list/colaborador-list.component';
import { MsgSucessoComponent } from './alertas/msg-sucesso/msg-sucesso.component';
import { MsgErroComponent } from './alertas/msg-erro/msg-erro.component';

@NgModule({
  declarations: [
    ColaboradorFormComponent,
    AsoComponent, 
    ColaboradorListComponent, 
    MsgSucessoComponent, 
    MsgErroComponent],
  imports: [
    CommonModule,
    SegurancaTrabalhoRoutingModule,
    FormsModule,
    BrowserModule,
    ModalModule.forRoot()
  ],
  exports:[
    ColaboradorFormComponent
  ],
  providers: []
})
export class SegurancaTrabalhoModule { 
  
}
