import React, { Component } from 'react';
import Disclaimer from './Disclaimer';
import './Login.css';
import {API_SERVER, API_VERSION} from '../config';
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
        <div className="container">
  				<div className="row">
            <div className="col">
              <h1>Chat Login</h1>
      	      <form onSubmit={this.login}>
      					<input className="form-control mb-3" type="text" id="email" placeholder="email" value={this.state.email} onChange={this.handleChange} />
      		      <input className="form-control mb-3" type="password" id="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
      		      <button className="btn btn-primary mb-3" onClick={this.login}>Login</button>
      				</form>
            </div>
          </div>
  	    </div>
        <div className="container mt-3">
          <Disclaimer />
        </div>
      </div>
	  )
  }

  login = event => {
    console.log(API_SERVER + API_VERSION + '/auth');
    event.preventDefault();
    axios.post(API_SERVER + API_VERSION + '/auth', {
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
