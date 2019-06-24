import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestmentDisplayComponent } from './investment-display.component';
import { Investment } from '../models/investment';

describe('InvestmentDisplayComponent', () => {
  let component: InvestmentDisplayComponent;
  let fixture: ComponentFixture<InvestmentDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentDisplayComponent]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentDisplayComponent);
    component = fixture.componentInstance;

    // simulate the parent setting the input property
    component.model = new Investment('investment', .01326, 5321.567);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise edit event when edit is clicked', () => {
    let wasEditClicked = false;
    const editButton = query<HTMLButtonElement>('#edit');

    component.edit.subscribe(() => wasEditClicked = true);
    editButton.click();

    expect(wasEditClicked).toBeTruthy();
  });

  it('should display the percentage formatted', () => {
    const percentageElement = query<HTMLElement>('#percentageDisplay');
    expect(percentageElement.textContent).toBe('1.33%');
  });

  it('should display the amount formatted', () => {
    const amountElement = query<HTMLElement>('#amountDisplay');
    expect(amountElement.textContent).toBe('$5,321.57');
  });

  function query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
});
