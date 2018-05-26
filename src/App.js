import React, { Component } from 'react';
import Login from './components/Login';

import Chat from './Routes/Chat.js';
import Search from './Routes/Search.js';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
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
    console.log(this.state.token);

    return (
      <Router>
        <div className="App">
          <ul>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/chat">Chat</Link></li>
          </ul>
          <Route path="/search" render={()=><Search token={this.state.token}/>}/>
          <Route path="/chat" render={()=><Chat token={this.state.token}/>}/>
        </div>
      </Router>
    );
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

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
}

export default App;
