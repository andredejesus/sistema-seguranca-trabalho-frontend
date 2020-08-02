import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-msg-erro',
  templateUrl: './msg-erro.component.html',
  styleUrls: ['./msg-erro.component.css']
})
export class MsgErroComponent implements OnInit {

  msgErro: string;

  constructor() { }

  ngOnInit() {
  }
  /* Método para setar uma mensagem no componente de alerta que será inserido em outro componente */
  setErro(msgErro: string, tempo: number = 5000){
    this.msgErro = msgErro;
    setTimeout(()=> {this.msgErro = null}, tempo);
  }

}
