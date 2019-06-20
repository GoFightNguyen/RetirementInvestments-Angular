import { browser, logging, element, by, Key } from 'protractor';
import { SummaryPage } from './summary.po';

describe('workspace-project App', () => {
  const summaryPage: SummaryPage = new SummaryPage();

  beforeAll(() => {
    summaryPage.navigateTo();
  });

  it('should display the desired amount to invest after inputting the Annual Salary', () => {
    summaryPage.inputAnnualSalary(106156);
    summaryPage.expectDesiredValuesToBe('15%', '$15,923.40');
  });

  it('should be able to add a percentage Investment', () => {
    element(by.id('addInvestment')).click();
    element(by.id('name')).sendKeys(4, 0, 1, '(', 'k', ')');
    element(by.id('selectInvestmentType')).element(by.cssContainingText('option', 'Percentage')).click();
    element(by.id('percentage')).sendKeys(0, Key.DECIMAL, 0, 6);
    element(by.id('submit')).click();

    summaryPage.expectTotalValuesToBe('6.00%', '$6,369.36');
  });

  it('should be able to add a fixed-amount Investment', () => {
    element(by.id('addInvestment')).click();
    const secondInvestment = element.all(by.tagName('app-investment-form')).last();
    secondInvestment.element(by.id('name')).sendKeys('Roth IRA');
    secondInvestment.element(by.id('selectInvestmentType')).element(by.cssContainingText('option', 'Fixed Amount')).click();
    secondInvestment.element(by.id('amount')).sendKeys(5500);
    secondInvestment.element(by.id('submit')).click();

    summaryPage.expectTotalValuesToBe('11.18%', '$11,869.36');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
