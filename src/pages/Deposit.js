import React, { Component } from 'react';
import walletService from '../lib/wallet-service';
import { Link } from 'react-router-dom';


class Deposit extends Component {
    state = {
        deposit:0,
        withdraw:0
    }
    handleChange = (e) =>{
        this.setState({
            deposit:e.target.value
        })   
    }
    handleClick = (e) =>{
        e.preventDefault()
        walletService.postDeposit(this.state.deposit)
    }
    handleChangeWithdraw = (e) =>{
        this.setState({
            withdraw:e.target.value
        })   
    }
    handleClickWithdraw = (e) =>{
        e.preventDefault()
        walletService.postWithdraw(this.state.withdraw)
    }
    
    render() {
        return (
            <div>
                <h3>Do your deposit</h3>
                <form>
                    <input name="deposit" placeholder="10000" required onChange={this.handleChange}></input>
                    <button type="submit" onClick={this.handleClick}>Deposit</button>
                </form>
                <form>
                    <input name="withdraw" placeholder="10000" required onChange={this.handleChangeWithdraw}></input>
                    <button type="submit" onClick={this.handleClickWithdraw}>Withdraw</button>
                </form>
                <Link to={"/"}>
                    <button >Return to home</button>
                </Link>
            </div>
        );
    }
}

export default Deposit;
