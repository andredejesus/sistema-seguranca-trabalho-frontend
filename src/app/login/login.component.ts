import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../controller/service/auth.service';
import { AlertaErroComponent } from '../controller/alertas/alerta-erro/alerta-erro.component';

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

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
  }

  realizarLogin(){
    this.authService.tentarLogar(this.username, this.password).subscribe(
      res => {
        
        const access_token = JSON.stringify(res);
        localStorage.setItem('access_token', access_token);
        this.route.navigate(['dashboard']);

    }, 
    
    erroResponse => {
        //this.msgErro.setMsgErro('Usuário não encontrado!');
        this.erro = erroResponse.error.error_description;
        //this.msgErro.setMsgErro(this.erros);
        console.log('Erros: ', this.erros);
    });
  }

}
