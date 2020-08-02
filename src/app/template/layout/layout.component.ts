import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    document.querySelector('header i').addEventListener('click', ()=>{
      document.querySelector('aside').classList.toggle('show');
      document.querySelector('.menu .fa-times').classList.add('show');
  })

  }

}
