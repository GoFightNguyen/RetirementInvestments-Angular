import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestmentFormComponent } from './investment-form.component';
import { FormsModule } from '@angular/forms';
import { NewInvestment } from '../investment';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { InvestmentPage } from './investment.po';
import { TestHostComponent } from './test-host.component';

describe('InvestmentFormComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let page: InvestmentPage;

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
    page = new InvestmentPage(fixture);
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

    it('should switch to edit mode when the user chooses to edit', () => {
      fixture.detectChanges();
      page.clickOnEdit();
      expect(page.investmentEditElement.hidden).toBeFalsy();
      expect(page.investmentDisplayElement.hidden).toBeTruthy();
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

  describe('in edit mode', () => {
    beforeEach(() => {
      fixture.detectChanges();
      page.clickOnEdit();
    });

    it('should display the Amount formatted and disabled when a percentage investment', () => {
      const amountElement: HTMLInputElement = page.investmentEditElement.querySelector('#amount');
      fixture.whenStable().then(() => {
        expect(amountElement.value).toContain('$6,369.36');
        expect(amountElement.disabled).toBeTruthy();
      });
    });

    it('should display the Percentage and enabled when a percentage investment', () => {
      const percentageElement: HTMLInputElement = page.investmentEditElement.querySelector('#percentage');
      fixture.whenStable().then(() => {
        expect(percentageElement.value).toContain('0.06');
        expect(percentageElement.disabled).toBeFalsy();
      });
    });

    it('should exit edit mode after submitting', () => {
      page.clickOnSubmit();
      expect(page.investmentEditElement.hidden).toBeTruthy();
      expect(page.investmentDisplayElement.hidden).toBeFalsy();
    });

    // TODO: edit mode when Fixed-Amount investment, recalculations

    // it('should recalculate the amount when submitting after changing the percentage', () => {
    //   const percentageElement: HTMLInputElement = page.investmentEditElement.querySelector('#percentage');
    //   percentageElement.value = '.07';
    //   percentageElement.dispatchEvent(new Event('input')); // dispatch a DOM event so Angular learns of input value change
    //   fixture.detectChanges();

    //   page.clickOnSubmit();

    //   fixture.whenStable().then(() => {
    //     const amountElement: HTMLInputElement = page.investmentDisplayElement.querySelector('#amountDisplay');
    //     expect(amountElement.textContent).toContain('$7,430.92');
    //   });
    // });
  });
});
