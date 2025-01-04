function Coin ({symbol, price, changePercent}) {
    return (
        <p>
            {symbol}: {changePercent} ${price}
        </p>
    );
}
export default Coin;