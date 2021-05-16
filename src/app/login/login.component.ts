import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../controller/service/auth.service';
import { AlertaErroComponent } from '../controller/alertas/alerta-erro/alerta-erro.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  erros: String[];
  erro: string;

  @ViewChild(AlertaErroComponent, {static: false}) msgErro: AlertaErroComponent;

  constructor(private authService: AuthService, 
              private route: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  realizarLogin(){
    this.spinner.show();

    this.authService.tentarLogar(this.username, this.password).subscribe(
      res => {

        setTimeout(() => {
          const access_token = JSON.stringify(res);
          localStorage.setItem('access_token', access_token);
        
          this.route.navigate(['dashboard']);
          this.spinner.hide();
        }, 3000);
        
        
    }, 
    
    erroResponse => {
        //this.msgErro.setMsgErro('Usuário não encontrado!');
        this.erro = erroResponse.error.error_description;
        //this.msgErro.setMsgErro(this.erros);
        console.log('Erros: ', this.erros);
    });
  }

}
