import React from 'react';
import './App.css';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TimerTest from './timertest.js';
import { SettingPage } from './settingPage.js';
import './App.css';

// alert(`Navigator vibrate function ${!!navigator.vibrate ? "does" : "does not"} exist`);

export class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      // Takes active tab from props if it is defined there
      activeTab: "setting",
      green: null,
      yellow: null,
      red: null,
      vibrate: null,
    };

    // Bind the handleSelect function already here (not in the render function)
    this.handleSelect = this.handleSelect.bind(this);
    this.handleTimerSelect = this.handleTimerSelect.bind(this);
    this.onUnload = this.onUnload.bind(this);
  }
  
  onUnload(event) { // the method that will be used for both add and remove event
    console.log("hellooww")
    event.returnValue = "Hellooww"
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload)
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload)
  }

  handleSelect(time) {
    this.setState({
      // activeTab: "timer"
    });

  }

  handleTimerSelect(timerConfig) {
    this.setState({
      green: timerConfig.green,
      yellow: timerConfig.yellow,
      red: timerConfig.red,
      vibrate: timerConfig.vibrate,
      activeTab: "timer",
    });
  }

  render() {
    //   var callback = function (key) {
    return (
      <div className="App">
        <Tabs activeKey={this.state.activeTab} defaultActiveKey="setting" onSelect={(eventKey, event) => { this.setState({ activeTab: eventKey }) }}
          // onSelect={this.handleSelect} 
          id="uncontrolled-tab-example">
          <Tab eventKey="setting" title="Setting">
            <SettingPage
              onRunClick={this.handleTimerSelect}
            />
          </Tab>
          <Tab eventKey="timer" title="Timer">
            <TimerTest greenTime={this.state.green} yellowTime={this.state.yellow} redTime={this.state.red} vibrateTime={this.state.vibrate} />
          </Tab>
        </Tabs>
        {/* <ButtonToolbar>
          <Button variant="primary" >
            Setting
        </Button>
        </ButtonToolbar>
        <TimerTest />
        <ButtonToolbar>
          <Button variant="primary" size="lg" onClick={this.startCounting}>
            Start
        </Button>
          <Button variant="secondary" size="lg">
            Reset
        </Button>
        </ButtonToolbar> */}

      </div>
    );
  }
}



// function msConverter({ milliseconds = 0, seconds = 0, minutes = 0, hours = 0 }:
//   { milliseconds?: number, seconds?: number, minutes?: number, hours?: number }) {
//     return milliseconds + (seconds * 1000) + (minutes * 60000) + (hours * 36000) 
// }

