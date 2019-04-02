import axios from 'axios';

class WalletService {
  constructor() {
    this.wallet = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    })
  }

  getMyProfile () {
      return this.wallet.get('/wallet/')
        .then(({ data }) => data)
  }

  postDeposit (deposit) {
      console.log("eeeeh",deposit)
      return this.wallet.put('/wallet/deposit',{deposit:deposit})
        .then(({ data }) => data)  
  }

  postWithdraw (withdraw) {
    console.log("ooooh",withdraw)
    return this.wallet.put('/wallet/withdraw',{withdraw:withdraw})
      .then(({ data }) => data)  
}
}

const walletService = new WalletService();
export default walletService;

