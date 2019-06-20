import { MockSummary } from '../investment';
import { Component } from '@angular/core';
@Component({
  template: `<app-investment-form [model]="investment" [annualSalary]="annualSalary"></app-investment-form>`
})
export class TestHostComponent {
  private summary = new MockSummary();
  investment = this.summary.investments[0];
  annualSalary = this.summary.annualSalary;
}
