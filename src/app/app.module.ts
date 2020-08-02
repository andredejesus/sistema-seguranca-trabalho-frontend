import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './template/menu/menu.component';
import { FormsModule } from "@angular/forms";

import { SegurancaTrabalhoModule } from './seguranca-trabalho/seguranca-trabalho.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './template/layout/layout.component';
import { TokenInterceptor } from './controller/token.interceptor';


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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
