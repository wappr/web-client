import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    }
  }
  render() {
    if(this.state.authenticated == false) {
      return (
        <div>
          Gotta login
        </div>
      )
    }
    
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
