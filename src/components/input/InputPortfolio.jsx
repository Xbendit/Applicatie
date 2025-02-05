import React from 'react';

function InputPortfolio({walletAdress, handleInputChange, blockchain, placeholder}) {
    return (
        <input
            type="text"
            value={walletAdress}
            placeholder={placeholder}
            onChange={(e) => handleInputChange(e, blockchain)}
        />
    );
}

export default InputPortfolio;