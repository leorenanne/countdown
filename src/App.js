import React, { Component } from 'react';

import './App.css';
import serializeForm from 'form-serialize';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


class App extends Component {
  constructor(){
    super();

    injectTapEventPlugin();

    const today = new Date()

    const eventDate = localStorage.getItem("event")

    var event = eventDate? new Date(eventDate) : new Date();

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
        <MuiThemeProvider>
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
            <Settings/>
        </div>
        </MuiThemeProvider>
      </div>

    );
  }
}

class Settings extends React.Component {
  constructor(){
    super();

    this.state = {
      open: false
    }

    this.handleOpen = () => {
      this.setState({open: true})
    }

    this.handClose = () => {
      this.setState({open: false})
    }

    this.handleDateChange = (event, date) => {
      console.log(date)
    }
  }

  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handClose}
      />,
      <FlatButton
        label="Done"
        primary={true}
        onTouchTap={this.handClose}
      />
    ]

    const customStyle = {
      width: '90%',
      maxWidth: 'none'
    }

    return(
      <div>
        <RaisedButton label="settings" onTouchTap={this.handleOpen} />
        <Dialog
          title="Set Date"
          actions={actions}
          modal={true}
          open={this.state.open}
          contentStyle={customStyle}
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}
        >
          <DatePicker hintText="Portrait Dialog" onChange={this.handleDateChange} />

        </Dialog>
      </div>
    );
  }
}

export default App;
