import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentFormComponent } from './investment-form.component';
import { FormsModule } from '@angular/forms';
import { NewInvestment } from '../investment';

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
      component.model = {
        name: 'test',
        percentage: 0.06
      };
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

  // TODO: if these tests are going to be simply isolated tests, then clean up
  // TODO: integration tests such as if the html is hidden/displayed
});
