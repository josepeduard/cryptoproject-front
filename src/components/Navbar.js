import React, { Component } from 'react';
import { withAuth } from '../components/AuthProvider';

class Navbar extends Component {
  render() {
    const { isLogged, user, logout } = this.props;
    const { username } = user;
    if (isLogged) {
      return <div>
        <h1>CryptoProject</h1>
        <h2>{ username }, navbar</h2>
        <p onClick={logout}>ByeBye</p>
      </div>
    } else {
      return <div>
        {/* <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link> */}
      </div>
    }
  
  }
}

export default withAuth(Navbar);