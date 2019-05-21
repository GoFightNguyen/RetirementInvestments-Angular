import { Component, OnInit } from '@angular/core';
import { Investment } from '../investment';

@Component({
  selector: 'app-investment-form',
  templateUrl: './investment-form.component.html',
  styleUrls: ['./investment-form.component.css']
})
export class InvestmentFormComponent implements OnInit {

  model: Investment = {
    name: '401(k)',
    percentage: 6,
    amount: 8700
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('submitted');
  }
}
