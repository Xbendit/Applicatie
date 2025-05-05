import React from 'react';
import calculateUnit from "../helpers/calculateUnit.js"

function CalculateTotal(cryptoBalances, askPrices) {
    let totalValue = 0;
    for (const blockchain in cryptoBalances) {
        if (askPrices[blockchain] && cryptoBalances[blockchain]?.confirmed_balance) {
            const balance = parseFloat(calculateUnit(blockchain, cryptoBalances[blockchain].confirmed_balance));
            const askPrice = parseFloat(askPrices[blockchain]).toFixed(2);
            totalValue += balance * parseFloat(askPrice);
        }
    }
    return totalValue.toFixed(2);
}
export default CalculateTotal;