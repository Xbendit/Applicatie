import React from 'react';
import './cryptoInfoHome.css';

export default function CryptoInfoHome({id, marketCapRank, image, marketCap, price, change, onIconClick,}) {

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
