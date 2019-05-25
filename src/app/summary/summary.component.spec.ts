import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryComponent } from './summary.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NewInvestment, Investment } from '../investment';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addNewInvestment adds a NewInvestment to the collection', () => {
    const expected: NewInvestment = {
      name: 'New investment',
      percentage: 0
    };
    component.addNewInvestment();
    const actual: Investment = component.summary.investments[component.summary.investments.length - 1];
    expect(actual instanceof NewInvestment).toBeTruthy('wrong type');
    expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
  });
});
