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
	    <div className="Contacts">
	      <ul>
					{ this.state.contacts.map(contact => <li key={contact.id} data-id={contact.id} onClick={(i) => this.props.loadChat(i)}>{contact.name}</li>)}
				</ul>
	    </div>
	  )
  }

	componentDidMount() {
		let self = this;
		axios.get('http://localhost:8000/v1/contacts', {
			params: {
				token: this.props.token
			}
		}).then(function(response) {
			const contacts = response.data;
			self.setState({contacts: contacts});
		});
	}
}
