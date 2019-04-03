import React, { Component } from 'react';
import { withAuth } from '../components/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Navbar extends Component {
  render() {
    const { isLogged, logout } = this.props;
    if (isLogged) {
      return <div>
        <label className="icon"><FontAwesomeIcon icon="info" /></label>  
        <h2>CryptoBuy</h2>
        <div className="textbox" >
            <label className="icon"><FontAwesomeIcon icon="sign-out-alt" /></label>
            <label className="icon"><FontAwesomeIcon icon="times" /></label>                     
            <input onClick={logout}/>
          </div>
        
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