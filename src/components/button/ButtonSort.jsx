import React from 'react';
import './ButtonSort.css'

function ButtonSort({onClick, className, children}) {
    return (
        <button
            onClick = {onClick}
            className= {`buttonSort ${className}`}
        > {children}
        </button>
  
);
}

export default ButtonSort;