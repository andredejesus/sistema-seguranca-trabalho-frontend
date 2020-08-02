import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/controller/service/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  usuarioLogado: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.usuarioLogado = this.authService.obterDadosUsuarioAutenticado();

    document.querySelector('header i').addEventListener('click', ()=>{
      document.querySelector('aside').classList.toggle('show');
      document.querySelector('.menu .fa-times').classList.add('show');
  })

  }

}
