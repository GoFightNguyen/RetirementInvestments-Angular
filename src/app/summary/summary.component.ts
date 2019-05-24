import { Component, OnInit } from '@angular/core';
import { Investment, NewInvestment, Summary } from '../investment';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  summary = new Summary();

  constructor() { }

  ngOnInit() {
  }

  addNewInvestment() {
    this.summary.investments.push(new NewInvestment());
  }
}
