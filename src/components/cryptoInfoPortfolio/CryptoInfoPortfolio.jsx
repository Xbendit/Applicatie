import React from 'react';
import calculateUnit from "../../helpers/calculateUnit.js";
import calculateWaarde from "../../helpers/calculateWaarde.js";
import ButtonPortfolio from "../button/ButtonPortfolio.jsx";

'../button/ButtonPortfolio.jsx'
import './CryptoInfoPortfolio.css'

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
            <div className='input-container'>
                <ButtonPortfolio
                    isButtonFetched={isButtonFetched}
                    fetchWalletData={fetchWalletData}
                    blockchain={blockchain}
                    className="portfolio-button"
                />

                <input
                    type="text"
                    className="portfolio-input"
                    value={walletAdress}
                    placeholder={`Public Key ${blockchain}`}
                    onChange={(e) => handleInputChange(e, blockchain)}
                />

            </div>
            {cryptoBalance ? (
                <p> Balans: {calculateUnit(blockchain, cryptoBalance?.confirmed_balance || "0")} </p>
            ) : (
                <p> Balans: 0 {blockchain.toUpperCase()} </p>
            )}
            <div>
                {cryptoStats && (
                    <>
                        <img src={cryptoStats.logo} className="coinImage" alt={`${blockchain} logo`}/>
                    </>
                )}
            </div>
            {cryptoStats && (
                <>
                    <p>${cryptoStats.price}</p>

                    <p>Waarde: ${calculateWaarde(calculateUnit(blockchain, cryptoBalance?.confirmed_balance || "0"), cryptoStats.price)}</p>

                    <p className="coinchange">{cryptoStats.changePercent}%</p>
                </>
            )}

        </div>
    );
}

export default CryptoInfoPortfolio;