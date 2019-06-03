import { Summary, Investment } from './investment';

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

        it('changing the Annual Salary', () => {
            summary.desiredPercentage = .077;
            summary.annualSalary = 55800;
            expectDesiredAmountToBeCloseTo(4296.60, 'original'); // Ensure desiredAmount was calculated
            summary.annualSalary = 106156;
            expectDesiredAmountToBeCloseTo(8174.01, 'changed');
        });

        it('changing the desired percentage', () => {
            summary.desiredPercentage = .077;
            summary.annualSalary = 55800;
            expectDesiredAmountToBeCloseTo(4296.60, 'original'); // Ensure desiredAmount was calculated
            summary.desiredPercentage = .15;
            expectDesiredAmountToBeCloseTo(8370.00, 'changed');
        });

        function expectDesiredAmountToBeCloseTo(expected: number, failOutput?: string) {
            expect(summary.desiredAmount).toBeCloseTo(expected, 2, failOutput);
        }
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

        it('changing the Annual Salary', () => {
            summary.desiredPercentage = .15;
            summary.annualSalary = 55800;
            summary.investments = [
                new Investment('School Retirement', .077, 4297),
                new Investment('Roth IRA', .099, 5500)
            ];

            // Ensure totals were calculated before the change
            expectTotalAmountInvestedToBeCloseTo(9797, 'original');
            expectTotalPercentageInvestedToBeCloseTo(.1756, 'original');

            summary.annualSalary = 106156;
            expectTotalAmountInvestedToBeCloseTo(9797, 'changed');
            expectTotalPercentageInvestedToBeCloseTo(.0923, 'changed');
        });

        it('ignores investments where amount is null', () => {
            summary.desiredPercentage = .15;
            summary.annualSalary = 55800;
            summary.investments = [
                new Investment('School Retirement', .077, 4297),
                new Investment('Roth IRA', .099, 5500),
                new Investment('amount is null', .10)
            ];
            expectTotalAmountInvestedToBeCloseTo(9797, 'original');
            expectTotalPercentageInvestedToBeCloseTo(.1756, 'original');
        });

        function expectTotalAmountInvestedToBeCloseTo(expected: number, failOutput?: string) {
            expect(summary.totalAmountInvested).toBeCloseTo(expected, 2, 'totalAmountInvested' + failOutput);
        }

        function expectTotalPercentageInvestedToBeCloseTo(expected: number, failOutput?: string) {
            expect(summary.totalPercentageInvested).toBeCloseTo(expected, 4, 'totalPercentageInvested' + failOutput);
        }
    });
});
