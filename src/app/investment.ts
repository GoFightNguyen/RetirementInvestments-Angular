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

    private _annualSalary = 0;
    private _desiredAmount = 0;

    get annualSalary(): number {
        return this._annualSalary;
    }

    set annualSalary(annualSalary: number) {
        this._annualSalary = annualSalary;
        this._desiredAmount = annualSalary * this.desiredPercentage;
    }

    get desiredAmount(): number {
        return this._desiredAmount;
    }

    get totalAmountInvested(): number {
        return this.investments.reduce((sum, i) => sum + i.amount, 0);
    }

    get totalPercentageInvested(): number {
        return this.totalAmountInvested / this._annualSalary;
    }
}
