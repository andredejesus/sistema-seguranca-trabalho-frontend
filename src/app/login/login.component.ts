import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../controller/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  loginErro: boolean;

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
  }

  realizarLogin(){
    this.authService.tentarLogar(this.username, this.password).subscribe(
      res => {
        
        const access_token = JSON.stringify(res);
        localStorage.setItem('access_token', access_token);

        this.route.navigate(['dashboard']);
    }, error =>{
      
        console.log('Ocorreu um erro ao gerar o token de acesso.');
    });
  }

}
