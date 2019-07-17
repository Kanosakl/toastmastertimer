import React from 'react';
import './App.css';
import { Button, ButtonToolbar, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TimerTest from './timertest.js';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

alert(`Navigator vibrate function ${!!navigator.vibrate ? "does" : "does not"} exist`);
export class App extends React.Component {

  render() {
    var callback = function (key) {

    }

    return (

      <div className="App">
        <Tabs defaultActiveKey="timer" id="uncontrolled-tab-example">
          <Tab eventKey="timer" title="Timer">
          <TimerTest />
          </Tab>
          <Tab eventKey="newTimer" title="Timer2">
          <TimerTest />
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

