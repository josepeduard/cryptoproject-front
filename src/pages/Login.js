import React, { Component } from 'react';
import { withAuth } from '../components/AuthProvider';
import "./Login.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



class Login extends Component {
  state = {
    username: "",
    password: "",
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state

    this.props.login({ username, password })
      .then((data) => {
        if(!data){
          console.log("lo estamos haciendo bien")
        }else{
          console.log("push")
        this.props.history.push('/')
        }
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
      <div className='login-box'>
      
        <div className = 'login-box-inner'>
          <h1>Login</h1>
          
          <form onSubmit={this.handleFormSubmit}>
          <div className="textbox" >
            <label className="icon"><FontAwesomeIcon icon="user" /></label>
            <input type="text" placeholder="username" name="username" value={username} onChange={this.handleChange}/>
          </div>
          <div className="textbox">
            <label className="icon"><FontAwesomeIcon icon="lock" /></label>
            <input type="password" placeholder="password" name="password" value={password} onChange={this.handleChange} />
          </div>
          <input className="btn" type="submit" value="LoginFuck!" />
          </form>
          
        </div>
      </div>
      
    )
  }
}

export default withAuth(Login);
