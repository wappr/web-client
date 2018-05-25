import React, { Component } from 'react';
import './Login.css';
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
	    <div className="LoginContainer">
				<h1>Chat Login</h1>
	      <form onSubmit={this.login}>
					<input type="text" id="email" placeholder="email" value={this.state.email} onChange={this.handleChange} />
		      <input type="password" id="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
		      <button onClick={this.login}>Login</button>
				</form>
	    </div>
	  )
  }

  login = event => {
    event.preventDefault();
    axios.post('https://api.wappr.net/v1/auth', {
      email: this.state.email,
      password: this.state.password
    })
    .then((response) => {
      if(response.data.status === "success") {
        this.setState({authenticated: true});
        this.setState({token: response.data.token});
        this.setState({password: ''});
				this.props.login(response.data.token);
      }
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
}
