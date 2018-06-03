import React, { Component } from 'react';
import Login from './components/Login';

import Chat from './Routes/Chat.js';
import Search from './Routes/Search.js';
import Requests from './Routes/Requests';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      email: '',
      token: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    if(this.state.authenticated === false) {
      return (
        <div>
          <Login login={this.login} />
        </div>
      )
    }

    return (
      <Router>
        <div className="container">
          <ul className="nav nav-tabs mb-3 mt-3">
            <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/">Chat</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/search">Search</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/requests">Requests</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/logout" onClick={this.logout}>Logout</NavLink></li>
          </ul>
          <Route path="/search" render={()=><Search token={this.state.token}/>}/>
          <Route path="/requests" render={()=><Requests />}/>
          <Route path="/" render={()=><Chat token={this.state.token} loadChat={this.loadChat} />} />
        </div>
      </Router>
    );
  }

  logout = () => {
    localStorage.removeItem('token');
    this.setState({token: ''});
    this.setState({authenticated: false});
  }

  loadChat = (e) => {
    console.log(e.target.dataset.id);
  }

  componentDidMount() {
    this.checkForToken();
  }

  // Check if the user already has a token stored locally, if they do, grab it
  // and set it in the state and also set them as authenticated
  checkForToken() {
    if(localStorage.getItem('token')) {
      this.setState({token: localStorage.getItem('token')});
      this.setState({authenticated: true});
    }
  }

  login = (token) => {
    // Set the token before changing authenticated to true
    // Otherwise, it'll render the App before it has set the token
    this.setState({token: token});
    this.setState({authenticated: true});
    localStorage.setItem('token', token);
  }

  logout = (e) => {
    this.setState({authenticated: false});
    this.setState({token: ''});
    localStorage.removeItem('token');
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
}

export default App;
