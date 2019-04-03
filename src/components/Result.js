import React from 'react';

const Result = ({result}) => {
    if(result) console.log("props de result",result)
   
    return(
        
        <div className='result'>
            <h2>Cryptocurrency prices of today</h2>
            <p className="price">Is {result.PRICE}</p>
            <p>Low price {result.LOWDAY}</p>
            <p>High price {result.HIGHDAY}</p>
        </div>)
        
    
}   

export default Result

