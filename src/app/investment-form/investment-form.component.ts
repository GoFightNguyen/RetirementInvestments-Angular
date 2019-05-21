import { Component, OnInit, Input } from '@angular/core';
import { Investment, NewInvestment } from '../investment';

@Component({
  selector: 'app-investment-form',
  templateUrl: './investment-form.component.html',
  styleUrls: ['./investment-form.component.css']
})
export class InvestmentFormComponent implements OnInit {
  inEditMode = false;
  @Input() model: Investment;

  ngOnInit() {
    if (this.model instanceof NewInvestment) {
      this.inEditMode = true;
    }
  }

  onSubmit() {
    this.inEditMode = false;
  }
}
