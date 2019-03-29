import React, { Component } from 'react';
import Form from '../components/Form';
import Result from '../components/Result';
import FiatWallet from '../components/FiatWallet'; 
import Navbar from '../components/Navbar';
import axios from 'axios';

class Home extends Component {
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
      <div>
          <h1>CryptoProject</h1>
          <Navbar data='data' />
          <FiatWallet />
          <Form exchangeCurrent={this.exchangeCurrent}/>
          <Result result={this.state.result}/>
      </div>
    );
  }
}

export default Home;