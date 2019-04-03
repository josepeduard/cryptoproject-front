import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';
import axios from 'axios';
import Cryptocoin from './Cryptocoin'; 
import Error from './Error'; 
import walletService from '../lib/wallet-service'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Form extends Component {
    state = {
        cryptos:[],
        cryptoName:'',
        coin: 0,
        crypto: 0,
        euros: 0,
        bitcoin: 0,
        etherum: 0,
        litecoin:0,
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
                    etherum: data.Ethereum,
                    litecoin: data.Litecoin
                })
            })
            .catch((err) =>{
                console.log(err)
            })
    }    
    

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({
            [name]:value,
            cryptoName:value
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
    buyLitecoin = () =>{
        const litecoinClean = this.props.result.PRICE.split("€ ")
        const litecoinPrice = litecoinClean[1].split(',').join('')
        
        console.log(litecoinPrice)
        this.setState({
            litecoin: this.state.litecoin + 1,
            euros: this.state.euros - parseInt(litecoinPrice) - 3
        }) 
       
    }

    sellLitecoin = () =>{
        const litecoinClean = this.props.result.PRICE.split("€ ")
        const litecoinPrice = litecoinClean[1].split(',').join('')
        
        console.log(litecoinPrice)
        this.setState({
            litecoin: this.state.litecoin - 1,
            euros: this.state.euros + parseInt(litecoinPrice) - 3
        }) 
       
    }
    buyEtherum = () =>{
        const etherumClean = this.props.result.PRICE.split("€ ")
        const etherumPrice = etherumClean[1].split(',').join('')
        
        console.log(etherumPrice)
        this.setState({
            etherum: this.state.etherum + 1,
            euros: this.state.euros - parseInt(etherumPrice) - 10
        }) 
       
    }

    sellEtherum = () =>{
        const etherumClean = this.props.result.PRICE.split("€ ")
        const etherumPrice = etherumClean[1].split(',').join('')
        
        console.log(etherumPrice)
        this.setState({
            etherum: this.state.etherum - 1,
            euros: this.state.euros + parseInt(etherumPrice) - 10
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
        const { euros, bitcoin, etherum, litecoin } = this.state
        // const {user} = this.props;
        // const { username } = user;
        return(
        <div>
            
                <form className="user-form" onSubmit={this.quoteCurrency}>
                
                    <div className="divisa">
                        <h2>Step 1: Exchange Area </h2>
                        <label>Choose your divisa</label>
                        <select
                            onChange={this.handleChange}
                            name='coin'
                            className="styleCoin"
                            >
                                <option value="">Moneda</option>
                                <option value="EUR">Euros</option>                       
                        </select>
                    </div>
                    
                
                    <div className="divisa">
                        <div>
                            <label>Choose your crypto</label>
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
                    <button className="btn btn-primary" type="submit" value="Cambiar">Change divisa</button>
                    {message}
                </form> 
                
                <h2>Step 2: Check your wallet </h2>
                <table>
                    <thead>
                        <tr>
                            <th>Euros </th>
                            <th>Bitcoin</th> 
                            <th>Ethereum</th> 
                            <th>Litecoin</th>                              
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{euros} €</td>
                            <td>{bitcoin} BTC</td> 
                            <td>{etherum} ETH</td>  
                            <td>{litecoin} LIT</td>                           
                        </tr>
                    </tbody>
                </table>


                {/******************** botones de compra ETH LTC ***********************/ }
                
                <div className="Buy-sell-container">
                    <div>
                    <h2>Step 3: </h2>
                    </div>
                    {/* { username }, buy and sell!  */}
                    {this.state.cryptoName === 'BTC' ? <div className="button-sell-buy">
                        <button className="btn btn-primary1" onClick={this.buyBitcoin}>Buy BTC</button>
                        <button className="btn btn-primary2" onClick={this.sellBitcoin}>Sell BTC</button>
                    </div> : false}
                        
                    {this.state.cryptoName === 'ETH' ? <div className="button-sell-buy">
                        <button className="btn btn-primary1" onClick={this.buyEtherum}>Buy</button>
                        <button className="btn btn-primary2" onClick={this.sellEtherum}>Sell</button>
                    </div> : false}

                    {this.state.cryptoName === 'LTC' ? <div className="button-sell-buy">
                        <button className="btn btn-primary1" onClick={this.buyLitecoin}>Buy</button>
                        <button className="btn btn-primary2" onClick={this.sellLitecoin}>Sell</button>
                    </div> : false}
                </div>
            </div>
        )
    }
}


export default withAuth(Form);
