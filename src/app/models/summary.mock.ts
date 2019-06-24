import { InvestmentTypes } from './investment-types';
import { Investment } from './investment';
import { Summary } from './summary';

export class MockSummary extends Summary {
    annualSalary = 106156;
    desiredPercentage = .15;
    investments: Investment[] = [
        new Investment('401(k)', .06, 6369.36),
        new Investment('Roth 401(k)', .04, 4246.24, InvestmentTypes.FixedAmount)
    ];
}
