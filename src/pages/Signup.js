import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';
import "./Signup.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Signup extends Component {

  state = {
    username: "",
    password: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.props.signup({ username, password })
      .then( (user) => {
        this.setState({
            username: "",
            password: "",
        });
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className='signup-box'>
        <div className='signup-box-inner'>
          <h1>Signup</h1>
          <form onSubmit={this.handleFormSubmit}>
          <div className="textbox" >
            <label className="icon"><FontAwesomeIcon icon="user" /></label>
            <input type="text" placeholder="username" name="username" value={username} onChange={this.handleChange}/>
          </div>
          <div className="textbox">
          <label className="icon"><FontAwesomeIcon icon="lock" /></label>
            <input type="password" placeholder="password" name="password" value={password} onChange={this.handleChange} />
          </div>
            <div>
              <input className="btn" type="submit" value="Signup" />
            </div>
          
            <div>
              <Link to={"/login"}>
              <input className="btn" type="submit" value="Go to the login" />
              </Link>
            </div>
            
            
          </form>
        </div>
        {/* <div>
          <p>Already have account? 
           
          </p>
        </div>
         */}

      </div>
    )
  }
}

export default withAuth(Signup);