import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();

    const today = new Date();
    const christmas = new Date("2017-12-25");

    this.state = {
      difference: Math.ceil((christmas - today)/1000/60/60/24)
    }
  }

  render() {
    return (
      <div>
        <p><b>Christmas</b></p>
        <p>How many days</p>
        <p>{this.state.difference}</p>
      </div>

    );
  }
}

export default App;
