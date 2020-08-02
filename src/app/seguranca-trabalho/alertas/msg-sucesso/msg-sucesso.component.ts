import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-msg-sucesso',
  templateUrl: './msg-sucesso.component.html',
  styleUrls: ['./msg-sucesso.component.css']
})
export class MsgSucessoComponent implements OnInit {

  msgSucesso: string;

  constructor() { }

  ngOnInit() {
  }

  setMsgSucesso(msgSucesso: string, tempo: number = 5000){
    this.msgSucesso = msgSucesso;
    setTimeout(() => {this.msgSucesso = null }, tempo);
  }

}
