import React, { Component } from 'react';
import './Search.css';
import {API_SERVER, API_VERSION} from '../config';
import axios from 'axios';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    }
  }
    render() {
      return (
          <div className="container">
            <h1>Search</h1>
            <input
              className="form-control"
              placeholder="Search for your pal"
              onKeyUp={this.doSearch}
            />
            <p className="text-muted"><small>Type at least three characters...</small></p>
            <ul className="list-group list-group-flush">
            { this.state.results.map(result => <li key={result.id} className="list-group-item" data-id={result.id}><span className="addContact" data-id={result.id} onClick={this.addContact}>Add Contact</span> {result.name}</li>)}
            </ul>
          </div>
      );
    }

    doSearch = (e) => {
      let self = this;
      if(e.target.value.length > 3) {
        axios.post(API_SERVER + API_VERSION + '/search', {
    			token: this.props.token,
          keywords: e.target.value
    		}).then(function(response) {
    			self.setState({results: response.data});
    		});
      }
    }

    addContact = (e) => {
      axios.post(API_SERVER + API_VERSION + '/request', {
        token: this.props.token,
        to: e.target.dataset.id
      }).then((response) => {
        if(response.data.status === 'success') {
          console.log('request sent');
        }
      });
    }
}
