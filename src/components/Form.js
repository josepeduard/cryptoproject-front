import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';
import axios from 'axios';
import Cryptocoin from './Cryptocoin'; 
import Error from './Error'; 
import walletService from '../lib/wallet-service'

class Form extends Component {
    state = {
        cryptos:[],
        coin: 0,
        crypto: 0,
        euros: 0,
        bitcoin: 0,
        etherum: 0,
        error: false
    }
    //Este método solo se ejecuta justo después de que el componente haya sido montado en el DOM.
    async componentDidMount(){
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
        await axios.get(url)
            .then(answer => {
                    this.setState({
                        cryptos: answer.data.Data
                    })
            })
        
        walletService.getMyProfile()
            .then((data) =>{
                this.setState({
                    euros: data.Euro,
                    bitcoin: data.Bitcoin,
                    etherum: data.Ethereum
                })
            })
            .catch((err) =>{
                console.log(err)
            })
    }    
    

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({
            [name]:value 
        })
    }

    quoteCurrency = e => {
        e.preventDefault();

        const{ coin, crypto} = this.state;

        if(coin === '' || crypto === ''){
            this.setState({
                error:true
            }, () => {
                setTimeout(() => {
                    this.setState({
                        error:false
                    })
                }, 4000);
            })
            return;
        }

        const exchange = {
            coin,
            crypto
        }

        this.props.exchangeCurrent(exchange);
    }

    buyEtherum = () =>{
        const etherumClean = this.props.result.PRICE.split("€ ")
        const etherumPrice = etherumClean[1].split(',').join('')
        
        console.log(etherumPrice)
        this.setState({
            etherum: this.state.etherum + 1,
            euros: this.state.euros - parseInt(etherumPrice) - 30
        }) 
       
    }

    sellEtherum = () =>{
        const etherumClean = this.props.result.PRICE.split("€ ")
        const etherumPrice = etherumClean[1].split(',').join('')
        
        console.log(etherumPrice)
        this.setState({
            etherum: this.state.etherum - 1,
            euros: this.state.euros + parseInt(etherumPrice) - 30
        }) 
       
    }

    buyBitcoin = () =>{
        const bitcoinClean = this.props.result.PRICE.split("€ ")
        const bitcoinPrice = bitcoinClean[1].split(',').join('')
        
        console.log(bitcoinPrice)
        this.setState({
            bitcoin: this.state.bitcoin + 1,
            euros: this.state.euros - parseInt(bitcoinPrice) - 30
        }) 
       
    }

    sellBitcoin = () =>{
        const bitcoinClean = this.props.result.PRICE.split("€ ")
        const bitcoinPrice = bitcoinClean[1].split(',').join('')
        
        console.log(bitcoinPrice)
        this.setState({
            bitcoin: this.state.bitcoin - 1,
            euros: this.state.euros + parseInt(bitcoinPrice) - 30
        }) 
       
    }

    
    render(){
        const message = (this.state.error) ? <Error message="Check if an input is empty" /> : '';
        const { euros, bitcoin, etherum } = this.state
        const {user} = this.props;
        const { username } = user;
        return(
        <div>
            <table>
            <thead>
                <tr>
                    <th>Euros </th>
                    <th>Bitcoin</th> 
                    <th>Ethereum</th>                             
                </tr>
            </thead>
                <tbody>
                <tr>
                
                    <td>{euros} €</td>
                    <td>{bitcoin} BTC</td> 
                    <td>{etherum} ETC</td>                             
                </tr>
            </tbody>
        </table>

        <div className="Buy-sell-container">
            <div className="button-sell-buy">
                <button className="buy" onClick={this.buyBitcoin}>Buy
                </button>
                <button className="Sell" onClick={this.sellBitcoin}>Sell
                </button>
            </div>
            <div className="button-sell-buy">
                <button className="buy" onClick={this.buyEtherum}>Buy
                </button>
                <button className="Sell" onClick={this.sellEtherum}>Sell
                </button>
            </div>
        </div>
        
        <form onSubmit={this.quoteCurrency}>
        
            

            
            <div className="coin1">
                <h2>Exchange Area { username }</h2>
                <label>¿Qué moneda quieres convertir?</label>
                <select
                    onChange={this.handleChange}
                    name='coin'
                    className="styleCoin"
                    >
                        <option value="">Moneda</option>
                        <option value="EUR">Euros</option>                       
                </select>
            </div>
        
            <div className="coin2">
              <div>
                <label>¿Qué cryptomoneda quieres convertir?</label>
                <select 
                        onChange={this.handleChange}
                        name="crypto"
                        className="tyleCoin">
                      <option value="">Cryptomoneda</option>
                      {Object.keys(this.state.cryptos).map(key =>(
                        <Cryptocoin
                        key={key}
                        crypto={this.state.cryptos[key]}
                        /> ))}
                </select>
              </div>
            </div>
            <input className="button" type="submit" value="Cambiar" />
            {message}
        </form> 
        </div>
        )
    }
}


export default withAuth(Form);
