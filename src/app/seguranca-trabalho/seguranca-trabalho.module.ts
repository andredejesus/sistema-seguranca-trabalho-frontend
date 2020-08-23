import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule } from 'ngx-mask';

import { SegurancaTrabalhoRoutingModule } from './seguranca-trabalho-routing.module';
import { ColaboradorFormComponent } from './paginas/colaborador/colaborador-form/colaborador-form.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ColaboradorListComponent } from './paginas/colaborador/colaborador-list/colaborador-list.component';
import { AlertaSucessoComponent } from './controller/alertas/alerta-sucesso/alerta-sucesso.component';
import { AlertaErroComponent } from './controller/alertas/alerta-erro/alerta-erro.component';
import { AsoFormComponent } from './paginas/aso/aso-form/aso-form.component';
import { AsoListComponent } from './paginas/aso/aso-list/aso-list.component';


@NgModule({
  declarations: [
    ColaboradorFormComponent,
    ColaboradorListComponent, 
    AlertaSucessoComponent, 
    AlertaErroComponent, 
    AsoFormComponent, 
    AsoListComponent, 
  ],
  imports: [
    CommonModule,
    SegurancaTrabalhoRoutingModule,
    FormsModule,
    BrowserModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  exports:[
    ColaboradorFormComponent,
    AsoFormComponent, 
    AsoListComponent
  ],
  providers: [

  ]
})
export class SegurancaTrabalhoModule { 
  
}
