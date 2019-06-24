import { Investment } from './investment';
export class Summary {
    private _annualSalary = 0;
    desiredPercentage = .15;
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
