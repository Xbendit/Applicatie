import React from 'react';

function CryptoInfoHome({marketCapRank, image, marketCap, price, change}) {
    return (
        <li className="coinitem">
            <p className="coinMCR">{marketCapRank}</p>
            <div>
            <img src={image} className="coinImage" alt="Coins"/>
            </div>
            <p className="coinMC">${marketCap}</p>
            <p className="coinprice">${price}</p>
            <p className="coinchange">{change}%</p>
        </li>
            );
}

            export default CryptoInfoHome;