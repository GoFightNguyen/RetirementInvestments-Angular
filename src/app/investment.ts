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
