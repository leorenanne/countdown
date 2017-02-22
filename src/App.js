import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();

    const today = new Date(localStorage.getItem("today"))
    const christmas = new Date(localStorage.getItem("christmas"))

    this.state = {
      difference: Math.ceil((christmas - today)/1000/60/60/24)
    }
  }

  render() {
    return (
      <div>
        <div id="mainCountdown">
          <div id="event">Christmas</div>
          <div id="countdown">{this.state.difference}</div>
          <div id="day">DAYS</div>
        </div>
      </div>

    );
  }
}

export default App;
