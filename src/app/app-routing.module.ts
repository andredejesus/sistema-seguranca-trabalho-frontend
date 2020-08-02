import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './template/layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './controller/auth.guard';


const routes: Routes = [
  {path: '', component: LayoutComponent, canActivate : [AuthGuard], children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
  ]},

  {path: 'login', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
