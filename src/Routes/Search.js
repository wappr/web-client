import React, { Component } from 'react';
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
          <div className="Search">
            <h1>Search</h1>
            <input
              className="form-control"
              placeholder="Search for your pal"
              onKeyUp={this.doSearch}
            />
            <p className="text-muted"><small>Type at least three characters...</small></p>
            <ul class="list-group list-group-flush">
            { this.state.results.map(result => <li key={result.id} className="list-group-item" data-id={result.id}>{result.name} - {result.id}</li>)}
            </ul>
          </div>
      );
    }

    doSearch = (e) => {
      let self = this;
      if(e.target.value.length > 3) {
        axios.post('https://api.wappr.net/v1/search', {
    			token: this.props.token,
          keywords: e.target.value
    		}).then(function(response) {
    			self.setState({results: response.data});
    		});
      }
    }
}
