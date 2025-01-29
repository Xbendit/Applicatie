import React from 'react';

function ButtonSort({onClick, className, children}) {
    return (
        <button
            onClick = {onClick}
            className= {className}
        > {children}
        </button>
  
);
}

export default ButtonSort;