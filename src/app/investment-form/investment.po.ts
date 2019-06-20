import { ComponentFixture } from '@angular/core/testing';
import { TestHostComponent } from './test-host.component';

export class InvestmentPage {
  private investmentFormElement: HTMLElement;
  get investmentEditElement() { return this.query<HTMLElement>('#investmentEdit'); }
  get investmentDisplayElement(): HTMLElement { return this.investmentFormElement.querySelector('#investmentDisplay'); }

  constructor(private fixture: ComponentFixture<TestHostComponent>) {
    this.investmentFormElement = fixture.nativeElement.querySelector('app-investment-form');
  }

  clickOnEdit() {
    const editElement: HTMLElement = this.investmentDisplayElement.querySelector('#edit');
    editElement.click();
    this.fixture.detectChanges();
  }

  clickOnSubmit() {
    const submitElement: HTMLButtonElement = this.investmentEditElement.querySelector('#submit');
    submitElement.click();
    this.fixture.detectChanges();
  }

  private query<T extends HTMLElement>(selector: string): T {
    return this.investmentFormElement.querySelector(selector);
  }
}
