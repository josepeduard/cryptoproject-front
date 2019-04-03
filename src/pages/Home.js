import React, { Component } from 'react';
import Form from '../components/Form';
import Result from '../components/Result';
// import FiatWallet from '../components/FiatWallet'; 
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
          <div className="content row">
            {/* <FiatWallet /> */}
            <Form exchangeCurrent={this.exchangeCurrent} result={this.state.result}/>
            <Result result={this.state.result}/>
            <Link to={"/deposit"}>
              <button className="btn btn-primary">Deposit/Withdraw</button>
            </Link>
          </div>
      </div>
    );
  }
}

export default withAuth(Home);