import React, { Component } from 'react';
import {Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Navbar from './components/Navbar';
import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthProvider from './components/AuthProvider';
import Form from './components/Form';
import Result from './components/Result';
import axios from 'axios';


class App extends Component {
  state = {
    result:{},
    coinSelect:'',
    cryptoSelect:''
  }

  exchangeCurrent = async (exchange)=>{
    
    const {coin,crypto} = exchange

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${coin}`;

    await axios.get(url)
      .then(answer => {
        this.setState({
          result: answer.data.DISPLAY[crypto][coin]
        })
      })

  }

  render() {
    return (
      <AuthProvider>
        <div className="container">
          <h1>CryptoProject</h1>
          <PrivateRoute path="/private" component={Private} />
          <Form 
          exchangeCurrent={this.exchangeCurrent}
          path="/form" component={Private} />
          <Result 
            result={this.state.result}/>
          <Navbar data='data' />
          
          <Switch>
            
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
