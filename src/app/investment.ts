export class InvestmentTypes {
    static readonly Percentage = 'Percentage';
    static readonly FixedAmount = 'Fixed Amount';

    static readonly all = [
        InvestmentTypes.Percentage,
        InvestmentTypes.FixedAmount
    ];

    /*
        I originally used an enum, but this created annoying issues, and thus
        extra complexity, when binding to the UI. For example:
          * Given an Investment with InvestmentType of Percentage
          * The Investment.InvestmentType would originally be 0 (number)
          * Changing the InvestmentType through the binding would then assign
            the new value, but as a string i.e. "1" instead of 1
          * This meant having to write more complex code and using ==
            instead of === when comparing the newly assigned value
            to the InvestmentTypes enum

        Another annoying issue using the enum came in trying to dynamically
        display the options in the UI. That's because in JavaScript the enum
        actually looked like
            {
                0: "Percentage",
                1: "FixedAmount",
                Percentage: 0,
                FixedAmount: 1
            }
    */
}

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

export class Summary {
    private _annualSalary = 0;
    desiredPercentage = .15;
    // investments: Investment[] = [
    //     new Investment('401(k)', .06, 8700),
    //     new Investment('Roth 401(k)', .04, 87)
    // ];
    investments: Investment[] = [];
    get annualSalary(): number {
        return this._annualSalary;
    }

    set annualSalary(value: number) {
        this._annualSalary = value;
        this.investments.forEach(i => {
            i.recalculate(value);
        });
    }

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

// export const MockSummary = {
//     annualSalary: 106156,
//     desiredPercentage: .15,
//     investments: [
//         new Investment('401(k)', .06, 6369.36),
//         new Investment('Roth 401(k)', .04, 4246.24)
//     ]
// };

export class MockSummary extends Summary {
    annualSalary = 106156;
    desiredPercentage = .15;
    investments: Investment[] = [
        new Investment('401(k)', .06, 6369.36),
        new Investment('Roth 401(k)', .04, 4246.24, InvestmentTypes.FixedAmount)
    ];
}
