import { Component } from '@angular/core';
import { NewInvestment, Summary } from '../investment';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  summary = new Summary();

  addInvestment() {
    this.summary.investments.push(new NewInvestment());
  }
}
