import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../controller/service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    

  constructor(private authService: AuthService) { }

  ngOnInit() {

   document.querySelector('.menu .fa-times').addEventListener('click', ()=>{
      document.querySelector('.menu .fa-times').classList.remove('show');
      document.querySelector('aside').classList.remove('show');
   })

  }

  encerrarSessao(){
    this.authService.encerrarSessao();
  }

}
