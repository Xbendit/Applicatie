function CalculateUnit(blockchain, amount) {

    let realUnit =0;

    if (blockchain === 'bitcoin')  {

        realUnit = amount/100000000

    } else if (blockchain === 'ethereum') {

        realUnit = amount/1000000000000000000
    } else if (blockchain === 'polkadot') {

        realUnit = amount/10000000000
    } else if (blockchain === 'solana') {

        realUnit = amount/1000000000
    } else if (blockchain === 'dogecoin') {

        realUnit = amount/100000000
    } else if (blockchain === 'xrp') {

        realUnit = amount/100000
    }
    return (
        realUnit
    );
}

export default CalculateUnit;