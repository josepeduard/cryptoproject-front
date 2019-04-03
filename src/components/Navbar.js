import React, { Component } from 'react';
import { withAuth } from '../components/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Navbar extends Component {
  render() {
    const { isLogged, logout } = this.props;
    if (isLogged) {
      return <div>
        <div className="row header">
          <div class="nav">
              {/* <button onClick={this.handleClick}>Deposit haha</button> */}
              <label className="icon"><FontAwesomeIcon icon="info" /></label>  
              <h2>CryptoApp</h2>
              <div className="textbox" >      
                <button onClick={logout}><label className="icon"><FontAwesomeIcon icon="times" /></label></button>
              </div>
            </div>
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