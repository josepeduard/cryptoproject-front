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
        coin: '',
        crypto: '',
        euros: '',
        dolars: '',
        yens: '',
        bitcoin: '',
        etherum: '',
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
                console.log(data);
                this.setState({
                    euros: data.Euro,
                    dolars: data.Dolar,
                    yens: data.Yen,
                    bitcoin: data.Bitcoin,
                    etherum: data.Ethereum
                })
                console.log(this.state)
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

    render(){
        const message = (this.state.error) ? <Error message="Check if an input is empty" /> : '';
        const { euros, dolars, yens, bitcoin, etherum } = this.state
        const {user} = this.props;
        const { username } = user;
        return(
        <form onSubmit={this.quoteCurrency}>
        <table>
            <thead>
                <tr>
                    <th>Euros</th>
                    <th>Dolars</th>
                    <th>Yens</th>
                    <th>Bitcoin</th> 
                    <th>Etherum</th>                             
                </tr>
            </thead>
                <tbody>
                <tr>
                    <td>{euros} €</td>
                    <td>{dolars} $</td>
                    <td>{yens} Y</td>
                    <td>{bitcoin} Btc</td> 
                    <td>{etherum} Eth</td>                             
                </tr>
            </tbody>
        </table>
            
            {message}
            <div className="row-1">
                <h2>Exchange Area { username }</h2>
                <label>¿Qué moneda quieres convertir?</label>
                <select
                    onChange={this.handleChange}
                    name='coin'
                    className="styleCoin">
                        <option value="">Moneda</option>
                        <option value="USD">Dolar</option>
                        <option value="EUR">Euros</option>
                        <option value="JPY">Japanese Yen</option>                        
                </select>
            </div>
        
            <div className="row-2">
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
        </form> 
        )
    }
}


export default withAuth(Form);
