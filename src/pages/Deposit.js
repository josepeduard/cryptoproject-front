import React, { Component } from 'react';
import walletService from '../lib/wallet-service';
import { Link } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Deposit.css";


class Deposit extends Component {
    state = {
        deposit:0,
        withdraw:0,
        euros:0,
        isShowingInfo:false,
    }
    componentDidMount= () =>{
        walletService.getMyProfile()
        .then((data) =>{
            this.setState({
                euros: data.Euro,
                
            })
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    handleChange = (e) =>{
        this.setState({
            deposit: parseInt(e.target.value)
        })   
    }
    
    handleClick = (e) =>{
        e.preventDefault()
        walletService.postDeposit(this.state.deposit)
            this.setState({
                euros: this.state.euros + this.state.deposit
            })
    
    }
    handleChangeWithdraw = (e) =>{
        this.setState({
            withdraw:parseInt(e.target.value)
        })   
    }
    handleClickWithdraw = (e) =>{
        e.preventDefault()
        walletService.postWithdraw(this.state.withdraw)
            this.setState({
                euros: this.state.euros - this.state.withdraw
            })
    }
      handleClickInfo = () =>{
        this.setState({
          isShowingInfo:true
        })
      }
    
    render() {
        return (
            <div>
                <Navbar2 data='data' clickInfo={this.handleClickInfo}/>
                <div className='deposit-box'>
                    <div className = 'deposit-box-inner'>
                    <h1>{this.state.euros}€</h1>
                    <form onSubmit={this.handleFormSubmit}>
                    <div className="textbox" >
                        <label className="icon"><FontAwesomeIcon icon="coins" /></label>
                        <input name="deposit" placeholder="12345" required onChange={this.handleChange}/>
                    </div>
                    <button className="btn btn-primary1" type="submit" onClick={this.handleClick}>Deposit</button>
                    
                    <div className="textbox">
                        <label className="icon"><FontAwesomeIcon icon="wallet" /></label>
                        <input name="withdraw" placeholder="12345" required onChange={this.handleChangeWithdraw}/>
                    </div>
                    <button className="btn btn-primary2" type="submit" onClick={this.handleClickWithdraw}>Withdraw</button>
                    </form>
                    
                    </div>
                    
                    {this.state.isShowingInfo === true?<div><h2>Commission for buyers/sellers</h2><h5>Bitcoin: 30 €</h5><h5>Etherum: 10 €</h5><h5>Litecoin: 3 €</h5></div>:<div><h1>Click i before deposit</h1></div>}
                </div>
                
            </div>
        );
    }
}

export default Deposit;
