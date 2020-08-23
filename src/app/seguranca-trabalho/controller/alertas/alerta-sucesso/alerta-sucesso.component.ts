import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerta-sucesso',
  templateUrl: './alerta-sucesso.component.html',
  styleUrls: ['./alerta-sucesso.component.css']
})
export class AlertaSucessoComponent implements OnInit {

  msgSucesso: string;

  constructor() { }

  ngOnInit(): void {
  }

  setMsgSucesso(msgSucesso: string, tempo: number = 5000){
    this.msgSucesso = msgSucesso;
    setTimeout(() => {this.msgSucesso = null }, tempo);
  }

}
