import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentFormComponent } from './investment-form.component';
import { FormsModule } from '@angular/forms';
import { NewInvestment, Investment, InvestmentType } from '../investment';

describe('InvestmentFormComponent', () => {
  let component: InvestmentFormComponent;
  let fixture: ComponentFixture<InvestmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentFormComponent],
      imports: [
        FormsModule
      ]
    })
      .compileComponents();
  }));

  describe('existing investment', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(InvestmentFormComponent);
      component = fixture.componentInstance;
      component.model = new Investment('test', 0.06);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('does not start in edit mode', () => {
      expect(component.inEditMode).toBeFalsy();
    });

    it('submit disables edit mode', () => {
      component.inEditMode = true;
      component.onSubmit();
      expect(component.inEditMode).toBeFalsy();
    });
  });

  describe('new investment', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(InvestmentFormComponent);
      component = fixture.componentInstance;
      component.model = new NewInvestment();
      fixture.detectChanges();
    });

    it('starts in edit mode', () => {
      expect(component.inEditMode).toBeTruthy();
    });

    it('submit disables edit mode', () => {
      component.onSubmit();
      expect(component.inEditMode).toBeFalsy();
    });
  });

  describe('submit', () => {
    it('should recalculate the amount for a percentage investment when changing the percentage', () => {
      const investment = new Investment('401(k)', .15, 15923.40);
      investment.investmentType = InvestmentType.Percentage;
      fixture = TestBed.createComponent(InvestmentFormComponent);
      component = fixture.componentInstance;
      component.model = investment;
      component.annualSalary = 106156;
      fixture.detectChanges();

      component.model.percentage = .077;
      component.onSubmit();
      expect(component.model.amount).toBeCloseTo(8174.01);
    });

    it('should recalculate the percentage for a fixed amount investment when changing the amount', () => {
      const investment = new Investment('401(k)', .15, 15923.40);
      investment.investmentType = InvestmentType.FixedAmount;
      fixture = TestBed.createComponent(InvestmentFormComponent);
      component = fixture.componentInstance;
      component.model = investment;
      component.annualSalary = 106156;
      fixture.detectChanges();

      component.model.amount = 8174.01;
      component.onSubmit();
      expect(component.model.percentage).toBeCloseTo(.077, 4);
    });
  });

  // TODO: if these tests are going to be simply isolated tests, then clean up
  // TODO: integration tests such as if the html is hidden/displayed
});
