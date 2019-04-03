import React, { Component } from 'react';
import Form from '../components/Form';
import Result from '../components/Result';
import FiatWallet from '../components/FiatWallet'; 
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { withAuth } from '../components/AuthProvider';
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
handleClick =()=>{

}
  render() {
    return (
      <div>
          <Navbar data='data' />
          <FiatWallet />
          <button onClick={this.handleClick}>Deposit</button>
          <Form exchangeCurrent={this.exchangeCurrent} result={this.state.result}/>
          <Result result={this.state.result}/>
          <Link to={"/deposit"}>
              <button >Do a deposit</button>
              </Link>
      </div>
    );
  }
}

export default withAuth(Home);