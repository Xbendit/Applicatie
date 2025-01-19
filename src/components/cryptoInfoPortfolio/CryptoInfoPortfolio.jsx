import React from 'react';
import calculateUnit from "../../helpers/calculateUnit.js";
import calculateWaarde from "../../helpers/calculateWaarde.js";

function CryptoInfoPortfolio({
                                 blockchain,
                                 walletAdress,
                                 handleInputChange,
                                 fetchWalletData,
                                 isButtonFetched,
                                 cryptoBalance,
                                 cryptoStats
}) {




    return (
        <div className={'crypto-coin'}>
            <input
                type="text"
                value={walletAdress}
                placeholder={`Public Key ${blockchain}`}
                onChange={(e) => handleInputChange(e, blockchain)}
            />

            <button
                onClick={() => fetchWalletData(blockchain)}
            >
                {isButtonFetched ? 'Wijzigen' : 'Invoeren'}
            </button>

            {cryptoBalance ? (
                <p> Balans: {calculateUnit(blockchain, cryptoBalance?.confirmed_balance || "0")} </p>
            ) : (
                <p> 0 {blockchain.toUpperCase()} </p>
            )}

            {cryptoStats && (
                <>
                    <img src={cryptoStats.logo} className="coinImage" alt={`${blockchain} logo`}/>
                    <p>${cryptoStats.price}</p>
                    <p>${calculateWaarde(calculateUnit(blockchain, cryptoBalance?.confirmed_balance || "0"), cryptoStats.price)}</p>
                    <p className="coinchange">{cryptoStats.changePercent}%</p>
                </>
            )}

        </div>
    );
}

export default CryptoInfoPortfolio;