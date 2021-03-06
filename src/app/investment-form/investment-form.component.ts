import { Component, OnInit, Input } from '@angular/core';
import { Investment, NewInvestment } from '../models/investment';
import { InvestmentTypes } from '../models/investment-types';

@Component({
  selector: 'app-investment-form',
  templateUrl: './investment-form.component.html',
  styleUrls: ['./investment-form.component.css']
})
export class InvestmentFormComponent implements OnInit {
  inEditMode = false;
  investmentTypes = InvestmentTypes.all;
  @Input() model: Investment;
  @Input() annualSalary: number;

  ngOnInit() {
    if (this.model instanceof NewInvestment) {
      this.inEditMode = true;
    }
  }

  onSubmit() {
    this.inEditMode = false;
    this.model.recalculate(this.annualSalary);
  }
}
