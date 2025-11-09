import React from 'react';
import './cryptoInfoHome.css';
/*
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
            export default CryptoInfoHome;*/

export default function CryptoInfoHome({id, marketCapRank, image, marketCap, price, change, onIconClick,}) {

   /* const handleClick = () => {
        if (onIconClick) onIconClick(id);
    };*/

    const handleClick = () => onIconClick?.(id);

    return (
        <li className="coinitem">
            <p className="coinMCR">{marketCapRank}</p>

            <button
                type="button"
                className="coinImageButton"
                onClick={handleClick}
                aria-label={`Toon details voor ${marketCapRank}`}
                title={`Toon details voor ${marketCapRank}`}
            >
                <img src={image} className="coinImage" alt={`${marketCapRank} logo`} />
            </button>

            <p className="coinMC">${marketCap}</p>
            <p className="coinprice">${price}</p>
            <p className="coinchange">{change}%</p>
        </li>
    );
}
/*export default function CryptoInfoHome({
                                           id, image, marketCapRank, marketCap, price, change, onIconClick
                                       }) {
    return (
        <li className="coin-row">
            <button className="icon-button" onClick={onIconClick} aria-label={`Toon details voor ${marketCapRank}`}>
                <img src={image} alt={`${marketCapRank} logo`} />
            </button>
            {/!* rest van de rij met je waarden *!/}
        </li>
    );
}*/
