import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {

   //document.querySelector('#item-colaborador .btn').addEventListener('click', ()=>{
        //document.querySelector('#item-colaborador .sub-menu').classList.toggle('show');
   //})

   document.querySelector('.menu .fa-times').addEventListener('click', ()=>{
      document.querySelector('.menu .fa-times').classList.remove('show');
      document.querySelector('aside').classList.remove('show');
   })

  }

}
