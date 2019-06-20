import { Summary, Investment, InvestmentTypes } from './investment';

describe('Summary', () => {
    let summary: Summary;

    beforeEach(() => {
        summary = new Summary();
    });

    describe('desired amount', () => {
        it('Annual Salary is $106,156 and desired percentage is 15%', () => {
            summary.desiredPercentage = .15;
            summary.annualSalary = 106156;
            expectDesiredAmountToBeCloseTo(15923.40);
        });

        it('Annual Salary is $55,800 and desired percentage is 15%', () => {
            summary.desiredPercentage = .15;
            summary.annualSalary = 55800;
            expectDesiredAmountToBeCloseTo(8370.00);
        });

        it('Annual Salary is $24,136.25 and desired percentage is 4.3%', () => {
            summary.desiredPercentage = .043;
            summary.annualSalary = 24136.25;
            expectDesiredAmountToBeCloseTo(1037.86);
        });

        it('Annual Salary is $55,800 and desired percentage is 7.7%', () => {
            summary.desiredPercentage = .077;
            summary.annualSalary = 55800;
            expectDesiredAmountToBeCloseTo(4296.60);
        });

        it('changing the desired percentage', () => {
            summary.desiredPercentage = .077;
            summary.annualSalary = 55800;
            expectDesiredAmountToBeCloseTo(4296.60, 'original'); // Ensure desiredAmount was calculated
            summary.desiredPercentage = .15;
            expectDesiredAmountToBeCloseTo(8370.00, 'changed');
        });
    });

    describe('totals', () => {
        it('Annual Salary is $106,156, desired percentage is 15%', () => {
            summary.desiredPercentage = .15;
            summary.annualSalary = 106156;
            summary.investments = [
                new Investment('401(k)', .06, 6369.36),
                new Investment('Roth 401(k)', .04, 4246.24),
                new Investment('Roth IRA', .0518, 5500)
            ];
            expectTotalAmountInvestedToBeCloseTo(16115.60);
            expectTotalPercentageInvestedToBeCloseTo(.1518);
        });

        it('Annual Salary is $55,800 desired percentage is 15%', () => {
            summary.desiredPercentage = .15;
            summary.annualSalary = 55800;
            summary.investments = [
                new Investment('School Retirement', .077, 4297),
                new Investment('Roth IRA', .099, 5500)
            ];
            expectTotalAmountInvestedToBeCloseTo(9797);
            expectTotalPercentageInvestedToBeCloseTo(.1756);
        });

        it('ignores investments where amount is null', () => {
            summary.desiredPercentage = .15;
            summary.annualSalary = 55800;
            summary.investments = [
                new Investment('School Retirement', .077, 4297),
                new Investment('Roth IRA', .099, 5500),
                new Investment('amount is null', .1, null)
            ];
            expectTotalAmountInvestedToBeCloseTo(9797, 'original');
            expectTotalPercentageInvestedToBeCloseTo(.1756, 'original');
        });
    });

    describe('changing Annual Salary', () => {
        beforeEach(() => {
            const investment1 = new Investment('401(k)', .06, 6369.36);
            const investment2 = new Investment('Roth 401(k)', .04, 4246.24);
            const investment3 = new Investment('Roth IRA', .0518, 5500);
            investment3.investmentType = InvestmentTypes.FixedAmount;

            summary.desiredPercentage = .15;
            summary.annualSalary = 106156;
            summary.investments = [
                investment1,
                investment2,
                investment3
            ];
        });

        it('recalculates the investments', () => {
            // Act
            summary.annualSalary = 55800;

            // Assert
            const expectedInvestment1 = new Investment('401(k)', .06, 3348.00);
            const expectedInvestment2 = new Investment('Roth 401(k)', .04, 2232.00);
            const expectedInvestment3 = new Investment('Roth IRA', .0986, 5500);
            expectedInvestment3.investmentType = InvestmentTypes.FixedAmount;
            areEqual(summary.investments[0], expectedInvestment1, 'investment1');
            areEqual(summary.investments[1], expectedInvestment2, 'investment2');
            areEqual(summary.investments[2], expectedInvestment3, 'investment3');

            function areEqual(actual: Investment, expected: Investment, failOutputPrefix: string): void {
                expect(actual.name).toBe(expected.name, failOutputPrefix + '-name');
                expect(actual.investmentType).toBe(expected.investmentType, failOutputPrefix + '-investmentType');
                expect(actual.percentage).toBeCloseTo(expected.percentage, 4, failOutputPrefix + '-percentage');
                expect(actual.amount).toBeCloseTo(expected.amount, 2, failOutputPrefix + '-amount');
            }
        });

        it('recalculates the totals', () => {
            // Act
            summary.annualSalary = 55800;

            // Assert
            expectTotalAmountInvestedToBeCloseTo(11080, 'changed');
            expectTotalPercentageInvestedToBeCloseTo(.1986, 'changed');
        });

        it('recalculates the desired amount', () => {
            summary.annualSalary = 55800;
            expectDesiredAmountToBeCloseTo(8370, 'original'); // Ensure desiredAmount was calculated
            summary.annualSalary = 106156;
            expectDesiredAmountToBeCloseTo(15923.40, 'changed');
        });
    });

    function expectDesiredAmountToBeCloseTo(expected: number, failOutput?: string) {
        expect(summary.desiredAmount).toBeCloseTo(expected, 2, failOutput);
    }

    function expectTotalAmountInvestedToBeCloseTo(expected: number, failOutput?: string) {
        expect(summary.totalAmountInvested).toBeCloseTo(expected, 2, 'totalAmountInvested' + failOutput);
    }

    function expectTotalPercentageInvestedToBeCloseTo(expected: number, failOutput?: string) {
        expect(summary.totalPercentageInvested).toBeCloseTo(expected, 4, 'totalPercentageInvested' + failOutput);
    }
});
