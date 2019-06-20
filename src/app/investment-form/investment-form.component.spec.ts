import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestmentFormComponent } from './investment-form.component';
import { FormsModule } from '@angular/forms';
import { NewInvestment, MockSummary } from '../investment';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';

class InvestmentFormPage {
  private investmentFormElement: HTMLElement;

  get investmentEditElement() { return this.query<HTMLElement>('#investmentEdit'); }
  get investmentDisplayElement(): HTMLElement { return this.investmentFormElement.querySelector('#investmentDisplay'); }

  constructor(fixture: ComponentFixture<TestHostComponent>) {
    this.investmentFormElement = fixture.nativeElement.querySelector('app-investment-form');
  }

  private query<T extends HTMLElement>(selector: string): T {
    return this.investmentFormElement.querySelector(selector);
  }
}

@Component({
  template: `<app-investment-form [model]="investment" [annualSalary]="annualSalary"></app-investment-form>`
})
class TestHostComponent {
  private summary = new MockSummary();
  investment = this.summary.investments[0];
  annualSalary = this.summary.annualSalary;
}

describe('InvestmentFormComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let page: InvestmentFormPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        TestHostComponent,
        InvestmentFormComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    page = new InvestmentFormPage(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('existing Investment', () => {
    it('should not be in edit mode after Angular calls ngOnInit', () => {
      fixture.detectChanges();
      expect(page.investmentEditElement.hidden).toBeTruthy();
      expect(page.investmentDisplayElement.hidden).toBeFalsy();
    });
  });

  describe('new Investment', () => {
    it('should be in edit mode after Angular calls ngOnInit', () => {
      component.investment = new NewInvestment();
      fixture.detectChanges();
      expect(page.investmentEditElement.hidden).toBeFalsy();
      expect(page.investmentDisplayElement.hidden).toBeTruthy();
    });
  });

  describe('display Investment', () => {
    it('should switch to edit mode when the user chooses to edit', () => {
      fixture.detectChanges();
      const editElement: HTMLElement = page.investmentDisplayElement.querySelector('#edit');
      editElement.click();
      fixture.detectChanges();
      expect(page.investmentEditElement.hidden).toBeFalsy();
      expect(page.investmentDisplayElement.hidden).toBeTruthy();
    });
  });

  describe('in edit mode', () => {
    it('should display the Amount formatted and disabled when a percentage investment', () => {
      // Arrange / Act
      fixture.detectChanges();
      const editElement: HTMLElement = page.investmentDisplayElement.querySelector('#edit');
      editElement.click();
      fixture.detectChanges();

      // Assert
      const amountElement: HTMLInputElement = page.investmentEditElement.querySelector('#amount');
      fixture.whenStable().then(() => {
        expect(amountElement.value).toContain('$8,700.00');
        expect(amountElement.disabled).toBeTruthy();
      });
    });

    it('should display the Percentage and enabled when a percentage investment', () => {
      // Arrange / Act
      fixture.detectChanges();
      const editElement: HTMLElement = page.investmentDisplayElement.querySelector('#edit');
      editElement.click();
      fixture.detectChanges();

      // Assert
      const percentageElement: HTMLInputElement = page.investmentEditElement.querySelector('#percentage');
      fixture.whenStable().then(() => {
        expect(percentageElement.value).toContain('0.06');
        expect(percentageElement.disabled).toBeFalsy();
      });
    });

    it('should exit edit mode when submitting', () => {
      fixture.detectChanges();
      const editElement: HTMLElement = page.investmentDisplayElement.querySelector('#edit');
      editElement.click();
      fixture.detectChanges();

      const submitElement: HTMLButtonElement = page.investmentEditElement.querySelector('#submit');
      submitElement.click();
      fixture.detectChanges();

      expect(page.investmentEditElement.hidden).toBeTruthy();
      expect(page.investmentDisplayElement.hidden).toBeFalsy();
    });

    // TODO: edit mode when Fixed-Amount investment, recalculations

    // it('should recalculate the amount when submitting after changing the percentage', () => {
    //   fixture.detectChanges();
    //   const editElement: HTMLElement = page.investmentDisplayElement.querySelector('#edit');
    //   editElement.click();
    //   fixture.detectChanges();

    //   const percentageElement: HTMLInputElement = page.investmentEditElement.querySelector('#percentage');
    //   percentageElement.value = '.07';
    //   percentageElement.dispatchEvent(new Event('input')); // dispatch a DOM event so Angular learns of input value change
    //   fixture.detectChanges();

    //   const submitElement: HTMLButtonElement = page.investmentEditElement.querySelector('#submit');
    //   submitElement.click();
    //   fixture.detectChanges();

    //   fixture.whenStable().then(() => {
    //     const amountElement: HTMLInputElement = page.investmentDisplayElement.querySelector('#amountDisplay');
    //     expect(amountElement.textContent).toContain('$7,430.92');
    //   });
    // });
  });
});
