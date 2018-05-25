import React, { Component } from 'react';
import './Button.css';

export default class Button extends Component {
  render() {
	  return (
	    <div className="Button">
	      <button className={this.props.type} onClick={this.handleClick}>{this.props.children}</button>
	    </div>
	  )
  }

	handleClick = () => {
		this.props.action();
	}
}
