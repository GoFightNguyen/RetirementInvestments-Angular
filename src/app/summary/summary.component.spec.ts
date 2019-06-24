import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SummaryComponent } from './summary.component';
import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core';
import { NewInvestment, Investment } from '../models/investment';
import { Summary } from '../models/summary';
import { FormsModule } from '@angular/forms';
import { SummaryPage } from './summary.po';

@Component({
  selector: 'app-investment-form',
  template: '<p>{{model.name}}</p><p>{{annualSalary}}</p>'
})
class InvestmentFormStubComponent {
  @Input() model: Investment;
  @Input() annualSalary: number;
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
    page.changeAnnualSalaryTo('55800.26');
    expect(component.summary.annualSalary).toBe(55800.26);
  });

  it('should add an Investment when the button is clicked', () => {
    // Act
    page.clickOnAddInvestment();

    // Assert DOM
    expect(page.investmentFormElements.length).toBe(1, 'investment forms');

    // Assert class
    const expected = new Investment('New Investment', null, null);
    const actual: Investment = component.summary.investments[component.summary.investments.length - 1];
    expect(actual instanceof NewInvestment).toBeTruthy('wrong type');
    expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
  });

  it('should be able to add multiple investments', () => {
    page.clickOnAddInvestment();
    page.clickOnAddInvestment();
    expect(page.investmentFormElements.length).toBe(2);
  });

  it('should provide the Investment and Annual Salary to the investment-form', () => {
    page.changeAnnualSalaryTo('106156');
    page.clickOnAddInvestment();

    const investmentFormPs = page.investmentFormElements[0].querySelectorAll('p');
    expect(investmentFormPs[0].textContent).toBe(component.summary.investments[0].name);
    expect(investmentFormPs[1].textContent).toBe(component.summary.annualSalary.toString());
  });
});
