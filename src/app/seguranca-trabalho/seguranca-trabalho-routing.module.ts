import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColaboradorFormComponent } from './paginas/colaborador/colaborador-form/colaborador-form.component';
import { ColaboradorListComponent } from './paginas/colaborador/colaborador-list/colaborador-list.component';
import { LayoutComponent } from '../template/layout/layout.component';
import { AuthGuard } from "../controller/auth.guard";


const routes: Routes = [
  {path: '', component: LayoutComponent, canActivate : [AuthGuard], children:[
    {path: 'colaborador-form', component: ColaboradorFormComponent},
    {path: 'colaborador-list', component: ColaboradorListComponent},
    {path: 'colaboradores/:id', component: ColaboradorFormComponent}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

exports: [RouterModule]
})
export class SegurancaTrabalhoRoutingModule { }
