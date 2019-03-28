import React from 'react';

const Cryptocoin =  ({crypto}) => {

    const { FullName, Name }  = crypto.CoinInfo;

    return(
        <option value={Name}>{FullName}</option>
    );
}

export default Cryptocoin; 