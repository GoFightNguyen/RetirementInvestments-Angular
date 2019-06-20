import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SummaryComponent } from './summary.component';
import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core';
import { NewInvestment, Investment, Summary } from '../investment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-investment-form',
  template: '<p>{{model.name}}</p><p>{{annualSalary}}</p>'
})
class InvestmentFormStubComponent {
  @Input() model: Investment;
  @Input() annualSalary: number;
}

class SummaryPage {
  // getter properties wait to query the DOM until called
  get annualSalaryInput() { return this.query<HTMLInputElement>('#annualSalary'); }
  get investmentFormElements() { return this.queryAll<HTMLElement>('app-investment-form'); }
  get addInvestmentBtn() { return this.query<HTMLButtonElement>('#addInvestment'); }

  constructor(private fixture: ComponentFixture<SummaryComponent>) { }

  private query<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
  }

  private queryAll<T>(selector: string): T[] {
    return this.fixture.nativeElement.querySelectorAll(selector);
  }
}

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;
  let page: SummaryPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        SummaryComponent,
        InvestmentFormStubComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;

    page = new SummaryPage(fixture);
    fixture.detectChanges(); // 1st change detection triggers ngOnInit
    fixture.whenStable().then(() => {
      fixture.detectChanges();  // 2nd change detection displays data
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a new Summary', () => {
    expect(component.summary).toEqual(new Summary());
  });

  it('should allow the Annual Salary to be edited', () => {
    page.annualSalaryInput.value = '55800.26';  // simulate user entering a new value
    page.annualSalaryInput.dispatchEvent(new Event('input')); // dispatch a DOM event so Angular learns of input value change
    expect(component.summary.annualSalary).toBe(55800.26);
  });

  it('should add an Investment when the button is clicked', () => {
    // export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
    //   if (el instanceof HTMLElement) {
    //     el.click();
    //   } else {
    //     el.triggerEventHandler('click', eventObj);
    //   }
    // }
    // Act
    page.addInvestmentBtn.click();
    fixture.detectChanges();

    // Assert DOM
    expect(page.investmentFormElements.length).toBe(1, 'investment forms');

    // Assert class
    const expected = new Investment('New Investment', null, null);
    const actual: Investment = component.summary.investments[component.summary.investments.length - 1];
    expect(actual instanceof NewInvestment).toBeTruthy('wrong type');
    expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
  });

  it('should be able to add multiple investments', () => {
    page.addInvestmentBtn.click();
    fixture.detectChanges();
    page.addInvestmentBtn.click();
    fixture.detectChanges();
    expect(page.investmentFormElements.length).toBe(2);
  });

  it('should provide the Investment and Annual Salary to the investment-form', () => {
    component.summary.annualSalary = 106156;
    fixture.detectChanges();
    page.addInvestmentBtn.click();
    fixture.detectChanges();

    const investmentFormPs = page.investmentFormElements[0].querySelectorAll('p');
    expect(investmentFormPs[0].textContent).toBe(component.summary.investments[0].name);
    expect(investmentFormPs[1].textContent).toBe(component.summary.annualSalary.toString());
  });
});
