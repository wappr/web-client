import React, { Component } from 'react';
import Login from './components/Login';
import Contacts from './components/Contacts';
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
      <div className="App">
        Logged in
        <Contacts token={this.state.token} />
      </div>
    );
  }

  login = (email, token) => {
    // Set the token before changing authenticated to true
    // Otherwise, it'll render the App before it has set the token
    this.setState({token: token});
    this.setState({authenticated: true});
    this.setState({email: email});
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
}

export default App;
