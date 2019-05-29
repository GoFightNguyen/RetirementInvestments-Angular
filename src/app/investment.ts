export interface Investment {
    name: string;
    percentage: number;
    amount?: number;
}

export class NewInvestment implements Investment {
    name = 'New investment';
    percentage = 0;
    amount?: number;
}

export class Summary {
    annualSalary = 0;
    desiredPercentage = .15;
    investments: Investment[] = [
        {
            name: '401(k)',
            percentage: .06,
            amount: 8700
        },
        {
            name: '401(k) Roth',
            percentage: .04,
            amount: 87
        }
    ];

    get desiredAmount(): number {
        return this.annualSalary * this.desiredPercentage;
    }

    get totalAmountInvested(): number {
        return this.investments.reduce((sum, i) => sum + i.amount, 0);
    }

    get totalPercentageInvested(): number {
        return this.totalAmountInvested / this.annualSalary;
    }
}
