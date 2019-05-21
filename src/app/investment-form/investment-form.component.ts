import { Component, OnInit } from '@angular/core';
import { Investment } from '../investment';

@Component({
  selector: 'app-investment-form',
  templateUrl: './investment-form.component.html',
  styleUrls: ['./investment-form.component.css']
})
export class InvestmentFormComponent implements OnInit {
  inEditMode = false;
  model: Investment = {
    name: '401(k)',
    percentage: .06,
    amount: 8700
  };

  ngOnInit() {
  }

  onSubmit() {
    this.inEditMode = false;
  }
}
