import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
	  return (
	    <div>
	      <input type="text" id="email" placeholder="email" value={this.state.email} onChange={this.handleChange} />
	      <input type="text" id="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
	      <button onClick={this.login}>Login</button>
	    </div>
	  )
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
				this.props.login(this.state.email, response.data.token);
      }
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
}
