export enum InvestmentType {
    Percentage,
    FixedAmount
}

export class Investment {
    name: string;
    percentage?: number;
    amount?: number;
    investmentType: InvestmentType = InvestmentType.Percentage; // TODO: should this come in through ctor? What should NewInvestment default to?

    constructor(name: string, percentage?: number, amount?: number) {
        this.name = name;
        this.percentage = percentage;
        this.amount = amount;
    }

    recalculate(annualSalary: number): void {
        if (this.investmentType === InvestmentType.Percentage) {
            this.amount = annualSalary * this.percentage;
        } else {
            this.percentage = this.amount / annualSalary;
        }
    }
}

export class NewInvestment extends Investment {
    constructor() { super('New Investment', null, null); }
}

export class Summary {
    annualSalary = 0;
    desiredPercentage = .15;
    investments: Investment[] = [
        new Investment('401(k)', .06, 8700),
        new Investment('Roth 401(k)', .04, 87)
    ];

    get desiredAmount(): number {
        return this.annualSalary * this.desiredPercentage;
    }

    get totalAmountInvested(): number {
        return this.investments.filter(i => i.amount).reduce((sum, i) => sum + i.amount, 0);
    }

    get totalPercentageInvested(): number {
        return this.totalAmountInvested / this.annualSalary;
    }
}
