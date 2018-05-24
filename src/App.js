import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      email: '',
      password: '',
      token: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    if(this.state.authenticated === false) {
      return (
        <div>
          <input type="text" id="email" placeholder="email" value={this.state.email} onChange={this.handleChange} />
          <input type="text" id="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
          <button onClick={this.login}>Login</button>
        </div>
      )
    }

    return (
      <div className="App">
        Logged in
      </div>
    );
  }

  login = event => {
    event.preventDefault();
    axios.post('http://localhost:8000/v1/auth', {
      email: this.state.email,
      password: this.state.password
    })
    .then((response) => {
      if(response.data.status === "success") {
        this.setState({authenticated: true});
        this.setState({token: response.data.token});
        this.setState({password: ''});
      }
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
}

export default App;
