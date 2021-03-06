import React, { Component } from 'react';
import Contacts from '../components/Contacts';

export default class Chat extends Component {
    render() {
      return (
          <div className="container">
            <Contacts token={this.props.token} loadChat={this.loadChat} />
          </div>
      );
    }
}
