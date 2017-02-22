import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import serializeForm from 'form-serialize'

class App extends Component {
  constructor(){
    super();

    const today = new Date()
    const event = new Date(localStorage.getItem("event"))

    this.state = {
      difference: Math.ceil((event - today)/1000/60/60/24)
    }

    this.calculateCountdown = (event) => {
      const values = serializeForm(event.target, { hash: true })

      localStorage.setItem("event", (new Date(values.eventDate)).toJSON())
    }

  }

  render() {
    return (
      <div>
        <div id="mainCountdown">
          <div id="event">Christmas</div>
          <div id="countdown">{this.state.difference}</div>
          <div id="day">DAYS</div>
          <br/>

        <form onSubmit={this.calculateCountdown}>
          <label> Date: <input
              type="text"
              name="eventDate"
              defaultValue="2020-01-01"
            />
          </label>
          <button>Submit</button>
        </form>

        </div>
      </div>

    );
  }
}

export default App;
