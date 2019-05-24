import { Component, OnInit } from '@angular/core';
import { Investment, NewInvestment, Summary } from '../investment';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  investments: Investment[] = [
    {
      name: '401(k)',
      percentage: .06,
      amount: 8700
    },
    {
      name: '401(k) Roth',
      percentage: .04,
      amount: 87
    }
  ];

  summary = new Summary();

  constructor() { }

  ngOnInit() {
  }

  addNewInvestment() {
    this.investments.push(new NewInvestment());
  }
}
