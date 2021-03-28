import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColaboradorFormComponent } from './paginas/colaborador/colaborador-form/colaborador-form.component';
import { ColaboradorListComponent } from './paginas/colaborador/colaborador-list/colaborador-list.component';
import { LayoutComponent } from '../template/layout/layout.component';
import { AuthGuard } from "../controller/auth.guard";
import { AsoFormComponent } from './paginas/aso/aso-form/aso-form.component';
import { AsoListComponent } from './paginas/aso/aso-list/aso-list.component';
import { TreinamentoFormComponent } from './paginas/treinamento/treinamento-form/treinamento-form.component';
import { TreinamentoListComponent } from './paginas/treinamento/treinamento-list/treinamento-list.component';
import { ExtintorFormComponent } from './paginas/extintor/extintor-form/extintor-form.component';


const routes: Routes = [
  {path: '', component: LayoutComponent, canActivate : [AuthGuard], children:[
    
    {path: 'colaborador-form', component: ColaboradorFormComponent},
    {path: 'colaborador-list', component: ColaboradorListComponent},
    {path: 'colaboradores/:id', component: ColaboradorFormComponent},

    {path: 'aso-form', component: AsoFormComponent},
    {path: 'aso-list', component: AsoListComponent},
    {path: 'aso/:id', component: AsoFormComponent},

    {path: 'treinamento-form', component: TreinamentoFormComponent},
    {path: 'treinamento-list', component: TreinamentoListComponent},
    {path: 'treinamento/:id', component: TreinamentoFormComponent},

    {path: 'extintor-form', component: ExtintorFormComponent}
    
  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

exports: [RouterModule]
})
export class SegurancaTrabalhoRoutingModule { }
