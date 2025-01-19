import React from 'react';

function ButtonPortfolio({ isButtonFetched, fetchWalletData, blockchain }){
    return (
        <button
            onClick={() => fetchWalletData(blockchain)}
        >
            {isButtonFetched [blockchain] ? 'Wijzigen' : 'Invoeren'}
        </button>
    );
};

export default ButtonPortfolio;