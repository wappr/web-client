import React, { Component } from 'react';
import Login from './components/Login';
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
      </div>
    );
  }

  login = (email, token) => {
    this.setState({authenticated: true});
    this.setState({email: email});
    this.setState({token: token});
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
}

export default App;
