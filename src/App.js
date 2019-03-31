import React, { Component } from 'react';
import {Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthProvider from './components/AuthProvider';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Switch>
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute path="/" component={Home} />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}
library.add(faUser, faLock)
export default App;
