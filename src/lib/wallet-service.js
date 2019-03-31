import axios from 'axios';

class AuthService {
  constructor() {
    this.wallet = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    })
  }

  list(){

  }




}

// Hacer este wallet-service
// 1. Llamar al backend
// 2. (funciona igual que authservice)