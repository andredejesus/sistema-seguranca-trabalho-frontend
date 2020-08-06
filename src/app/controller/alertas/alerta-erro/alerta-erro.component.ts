import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerta-erro',
  templateUrl: './alerta-erro.component.html',
  styleUrls: ['./alerta-erro.component.css']
})
export class AlertaErroComponent implements OnInit {

  msgErro:string [];



  constructor() { }

  ngOnInit(): void {
  }

  setMsgErro(msgErro: string [], tempo: number = 5000){
    this.msgErro = msgErro;
    setTimeout(() => {this.msgErro = null }, tempo);
  }

}
