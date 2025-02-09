function CalculateWaarde (amount, dollarValue) {

    const walletValue = amount * dollarValue;

    return (
        walletValue.toFixed(2)
    );
}

export default CalculateWaarde;