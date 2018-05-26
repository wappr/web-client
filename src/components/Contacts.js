import React, { Component } from 'react';
import './Contacts.css';
import axios from 'axios';

export default class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    }
  }
  render() {
	  return (
	    <div className="container">
	      <ul>
					{ this.state.contacts.map(contact => <li key={contact.id} data-id={contact.id} onClick={(i) => this.props.loadChat(i)}>{contact.name}</li>)}
				</ul>
	    </div>
	  )
  }

	componentDidMount() {
		let self = this;
		axios.post('https://api.wappr.net/v1/contacts', {
			token: this.props.token
		}).then(function(response) {
			const contacts = response.data;
			self.setState({contacts: contacts});
		});
	}
}
