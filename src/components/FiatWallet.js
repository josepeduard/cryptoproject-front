import React, { Component } from 'react';
import { withAuth } from '../components/AuthProvider';

class FiatWallet extends Component {

    render(){
        return(
        <h1>Hola</h1>
        )
    }
}

export default withAuth(FiatWallet);