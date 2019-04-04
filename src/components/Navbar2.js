import React, { Component } from 'react';
import { withAuth } from './AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


class Navbar2 extends Component {
  
  render() {
      return (
        <div className="row header">
          <div class="nav">
              <label onClick={this.props.clickInfo}className="icon"><FontAwesomeIcon icon="info" /></label>  
              <h2>CryptoApp</h2>
              <div className="textbox" >  
              <Link to={"/"}>   
                <button><label className="icon"><FontAwesomeIcon icon="home" /></label></button>
              </Link> 
              </div>
            </div>
        </div> 
      )
    } 

}

export default withAuth(Navbar2);