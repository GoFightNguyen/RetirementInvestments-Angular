import { ComponentFixture } from '@angular/core/testing';
import { SummaryComponent } from './summary.component';

export class SummaryPage {
  // getter properties wait to query the DOM until called
  get annualSalaryInput() { return this.query<HTMLInputElement>('#annualSalary'); }
  get investmentFormElements() { return this.queryAll<HTMLElement>('app-investment-form'); }
  get addInvestmentBtn() { return this.query<HTMLButtonElement>('#addInvestment'); }

  constructor(private fixture: ComponentFixture<SummaryComponent>) { }

  changeAnnualSalaryTo(value: string) {
    this.annualSalaryInput.value = value;  // simulate user entering a new value
    this.annualSalaryInput.dispatchEvent(new Event('input')); // dispatch a DOM event so Angular learns of input value change
  }

  clickOnAddInvestment() {
    this.addInvestmentBtn.click();
    this.fixture.detectChanges();

    // export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
    //   if (el instanceof HTMLElement) {
    //     el.click();
    //   } else {
    //     el.triggerEventHandler('click', eventObj);
    //   }
    // }
  }

  private query<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
  }
  private queryAll<T>(selector: string): T[] {
    return this.fixture.nativeElement.querySelectorAll(selector);
  }
}
