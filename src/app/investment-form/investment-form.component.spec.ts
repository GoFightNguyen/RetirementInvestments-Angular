import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentFormComponent } from './investment-form.component';
import { FormsModule } from '@angular/forms';

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

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentFormComponent);
    component = fixture.componentInstance;
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

  // TODO: if these tests are going to be simply isolated tests, then clean up
  // TODO: integration tests such as if the html is hidden/displayed
});
