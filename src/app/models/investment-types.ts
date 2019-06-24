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
