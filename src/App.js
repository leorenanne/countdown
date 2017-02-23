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

    this.state = {
      difference: null
    }

    injectTapEventPlugin();

    this.initialise = () => {
        const today = new Date()

        const eventDate = localStorage.getItem("event")
        var event = eventDate? new Date(eventDate) : new Date();

        var diff = Math.ceil((event - today)/1000/60/60/24)

        this.setState({difference: diff })
    }

    this.calculateCountdown = (event) => {
      const values = serializeForm(event.target, { hash: true })
      localStorage.setItem("event", (new Date(values.eventDate)).toJSON())
    }

    this.changeDate = (date) => {
      localStorage.setItem("event", (new Date(date)).toJSON())
      this.initialise();
    }
  }

  componentDidMount() {
    this.initialise();
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
        <div id="mainCountdown">
          <div id="event">Event</div>
          <div id="countdown">{this.state.difference}</div>
          <div id="day">DAYS</div>
          <br/>

            <Settings changeDate={this.changeDate.bind(this)}/>
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
      this.props.changeDate(date)
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
        <RaisedButton label="Change" onTouchTap={this.handleOpen} />
        <Dialog
          title="Set Date"
          actions={actions}
          modal={true}
          open={this.state.open}
          contentStyle={customStyle}
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}
        >
          <DatePicker hintText="YYYY-MM-DD" onChange={this.handleDateChange.bind(this)} />

        </Dialog>
      </div>
    );
  }
}

export default App;
