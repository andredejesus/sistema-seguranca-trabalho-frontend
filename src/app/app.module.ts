import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './template/menu/menu.component';
import { FormsModule } from "@angular/forms";

import { SegurancaTrabalhoModule } from './seguranca-trabalho/seguranca-trabalho.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './template/layout/layout.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    LoginComponent,
    LayoutComponent
  ],
  imports: [

BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    SegurancaTrabalhoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
