import React from 'react';
import './ButtonPortfolio.css'

function ButtonPortfolio({ isButtonFetched, fetchWalletData, blockchain, className }){
    return (
        <button
            onClick={() => fetchWalletData(blockchain)}
            className= {`buttonportfolio ${className}`}
        >
            {isButtonFetched ? 'Wijzigen' : 'Invoeren'}
        </button>
    );
};

export default ButtonPortfolio;