import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const hoje = moment();
    const dataFutura = moment('2021-01-01');

    console.log(dataFutura.diff(hoje, 'months'));

    const a = moment.duration(1, 'd')

    const b = moment.duration(2, 'd')

    hoje.add(10, 'days');

    console.log('Hoje: ', hoje.format('DD/MM/YYYY'));


  }

}
