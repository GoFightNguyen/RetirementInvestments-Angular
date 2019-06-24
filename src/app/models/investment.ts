import { InvestmentTypes } from './investment-types';

export class Investment {
    name: string;
    percentage?: number;
    amount?: number;
    investmentType: InvestmentTypes;

    constructor(name: string, percentage: number, amount: number, type: InvestmentTypes = InvestmentTypes.Percentage) {
        this.name = name;
        this.percentage = percentage;
        this.amount = amount;
        this.investmentType = type;
    }

    recalculate(annualSalary: number): void {
        if (this.investmentType === InvestmentTypes.Percentage) {
            this.amount = annualSalary * this.percentage;
        } else {
            this.percentage = this.amount / annualSalary;
        }
    }

    get isContributionPercentageBased(): boolean {
        return this.investmentType === InvestmentTypes.Percentage;
    }
}

export class NewInvestment extends Investment {
    constructor() { super('New Investment', null, null); }
}
