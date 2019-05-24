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

    private _annualSalary = 0;
    private _desiredAmount = 0;

    get annualSalary(): number {
        return this._annualSalary;
    }

    // TODO: unit tests
    set annualSalary(annualSalary: number) {
        this._annualSalary = annualSalary;
        this._desiredAmount = annualSalary * this.desiredPercentage;
    }

    get desiredAmount(): number {
        return this._desiredAmount;
    }
}
