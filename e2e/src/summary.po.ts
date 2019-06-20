import { browser, element, by } from 'protractor';

export class SummaryPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }
  inputAnnualSalary(annualSalary: number) {
    element(by.id('annualSalary')).sendKeys(annualSalary);
  }
  expectDesiredValuesToBe(expectedPercentage: string, expectedAmount: string) {
    const desiredText = element.all(by.css('.card-footer .row')).first().getText();
    expect(desiredText).toContain(expectedPercentage, 'desired percentage');
    expect(desiredText).toContain(expectedAmount, 'desired amount');
  }
  expectTotalValuesToBe(expectedPercentage: string, expectedAmount: string) {
    const totalText = element.all(by.css('.card-footer .row')).last().getText();
    expect(totalText).toContain(expectedPercentage, 'total percentage');
    expect(totalText).toContain(expectedAmount, 'total amount');
  }
}
