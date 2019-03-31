import React, { Component } from 'react';
import { withAuth } from '../components/AuthProvider';

class FiatWallet extends Component {

    render(){
        return(
        <h1>Wallet</h1>
        )
    }
}

export default withAuth(FiatWallet);