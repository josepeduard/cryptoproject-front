import React, { Component } from 'react';
import { withAuth } from '../components/AuthProvider';

class FiatWallet extends Component {

    render(){
        return(
        <div> </div>
        )
    }
}

export default withAuth(FiatWallet);