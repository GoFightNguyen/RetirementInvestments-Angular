import { Component, OnInit, Input } from '@angular/core';
import { Investment } from '../models/investment';
import { InvestmentTypes } from '../models/investment-types';

@Component({
  selector: 'app-investment-edit',
  templateUrl: './investment-edit.component.html',
  styleUrls: ['./investment-edit.component.css']
})
export class InvestmentEditComponent implements OnInit {
  investmentTypes = InvestmentTypes.all;
  @Input() model: Investment;
  @Input() annualSalary: number;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.model.recalculate(this.annualSalary);
  }
}
