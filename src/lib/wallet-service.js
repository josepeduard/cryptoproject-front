import axios from 'axios';

class WalletService {
  constructor() {
    this.wallet = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    })
  }

  getMyProfile () {
      return this.wallet('/wallet/')
        .then(({ data }) => data)
  }

  postDeposit () {
      return this.wallet('/wallet/deposit')
        .then(({ data }) => data)  
  }

}

const walletService = new WalletService();
export default walletService;

// Hacer este wallet-service
// 1. Llamar al backend
// 2. (funciona igual que authservice)