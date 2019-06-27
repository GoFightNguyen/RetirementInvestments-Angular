import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentEditComponent } from './investment-edit.component';
import { FormsModule } from '@angular/forms';
import { Investment } from '../models/investment';
import { InvestmentTypes } from '../models/investment-types';

describe('InvestmentEditComponent', () => {
  let component: InvestmentEditComponent;
  let fixture: ComponentFixture<InvestmentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [InvestmentEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentEditComponent);
    component = fixture.componentInstance;

    // simulate the parent setting the Input property annualSalary
    component.annualSalary = 106156;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: new investment, changing the investmentType, submit emits event

  it('should have the investment types as an option', () => {
    component.model = new Investment('401(k)', .06, 6369.36);
    fixture.detectChanges();

    const optionElements: HTMLElement[] = fixture.nativeElement
      .querySelector('#selectInvestmentType')
      .querySelectorAll('option');

    expect(optionElements.length).toBe(InvestmentTypes.all.length);
    for (const option of optionElements) {
      expect(InvestmentTypes.all).toContain(option.textContent);
    }
  });

  describe('existing percentage investment', () => {
    beforeEach(() => {
      component.model = new Investment('401(k)', .06, 6369.36);
      fixture.detectChanges();
    });

    it('should indicate it is a percentage investment', () => {
      const investmentTypeElement: HTMLSelectElement = fixture.nativeElement.querySelector('#selectInvestmentType');
      fixture.whenStable().then(() => {
        expect(investmentTypeElement.selectedOptions.length).toBe(1, 'should only be one selected item');
        expect(investmentTypeElement.selectedOptions[0].textContent).toBe(InvestmentTypes.Percentage);
      });
    });

    it('should display the Amount formatted and disabled', () => {
      const amountElement: HTMLInputElement = fixture.nativeElement.querySelector('#amount');
      fixture.whenStable().then(() => {
        expect(amountElement.value).toBe('$6,369.36');
        expect(amountElement.disabled).toBeTruthy();
      });
    });

    it('should display the Percentage and enabled', () => {
      const percentageElement: HTMLInputElement = fixture.nativeElement.querySelector('#percentage');
      fixture.whenStable().then(() => {
        expect(percentageElement.value).toBe('0.06');
        expect(percentageElement.disabled).toBeFalsy();
      });
    });

    it('should switch input modes when changed to a fixed-amount investment', () => {
      const investmentTypeElement: HTMLSelectElement = fixture.nativeElement.querySelector('#selectInvestmentType');
      investmentTypeElement.click();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        investmentTypeElement.options[1].click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {

        });
      });
      // fixture.detectChanges();
      // fixture.detectChanges();
      // // investmentTypeElement.selectedIndex = InvestmentTypes.all.indexOf(InvestmentTypes.FixedAmount);
      // // fixture.detectChanges();
      // fixture.whenStable().then(() => {

      //   console.log(component.model.investmentType);
      // });
      // investmentTypeElement.selectedIndex = InvestmentTypes.all.indexOf(InvestmentTypes.FixedAmount);
      // fixture.detectChanges();
    });
  });

  describe('existing fixed-amount investment', () => {
    beforeEach(() => {
      component.model = new Investment('Roth 401(k)', .04, 4246.24, InvestmentTypes.FixedAmount);
      fixture.detectChanges();
    });

    it('should indicate it is a fixed-amount investment', () => {
      const investmentTypeElement: HTMLSelectElement = fixture.nativeElement.querySelector('#selectInvestmentType');
      fixture.whenStable().then(() => {
        expect(investmentTypeElement.selectedOptions.length).toBe(1, 'should only be one selected item');
        expect(investmentTypeElement.selectedOptions[0].textContent).toBe(InvestmentTypes.FixedAmount);
      });
    });

    it('should display the Percentage formatted and disabled', () => {
      const percentageElement: HTMLInputElement = fixture.nativeElement.querySelector('#percentage');
      fixture.whenStable().then(() => {
        expect(percentageElement.value).toBe('4.00%');
        expect(percentageElement.disabled).toBeTruthy();
      });
    });

    it('should display the Amount and enabled', () => {
      const amountElement: HTMLInputElement = fixture.nativeElement.querySelector('#amount');
      fixture.whenStable().then(() => {
        expect(amountElement.value).toBe('4246.24');
        expect(amountElement.disabled).toBeFalsy();
      });
    });
  });

  // it('should recalculate the amount when submitting after changing the percentage', () => {
  //   component.model = new Investment('investment', .06, 6369.36);
  //   fixture.detectChanges();

  //   const percentageElement: HTMLInputElement = fixture.nativeElement.querySelector('#percentage');
  //   percentageElement.value = '.07';
  //   percentageElement.dispatchEvent(new Event('input')); // dispatch a DOM event so Angular learns of input value change
  //   fixture.detectChanges();

  //   // page.clickOnSubmit();
  //   const submitElement: HTMLButtonElement = fixture.nativeElement.querySelector('#submit');
  //   submitElement.click();
  //   fixture.detectChanges();

  //   // TODO: why isn't this value updating in the UI
  //   fixture.whenStable().then(() => {
  //     const amountElement: HTMLInputElement = fixture.nativeElement.querySelector('#amount');
  //     expect(amountElement.value).toBe('$7,430.9');
  //   });
  // });
});
