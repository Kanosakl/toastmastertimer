import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToastmasterTimer from './toastmasterTimer.js';
import { SettingPage } from './settingPage.js';
import './App.css';

export class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      activeTab: "setting",
      green: null,
      yellow: null,
      red: null,
      vibrate: null,
    };

    // Bind the handleSelect function here (instead of in the render function)
    this.handleTimerSelect = this.handleTimerSelect.bind(this);
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
    return (
      <div className="App">
        <Tabs
          activeKey={this.state.activeTab}
          defaultActiveKey="setting"
          onSelect={(eventKey, event) => { this.setState({ activeTab: eventKey }) }}
          id="uncontrolled-tab-example">
          <Tab eventKey="setting" title="Setting">
            <SettingPage
              onRunClick={this.handleTimerSelect}
            />
          </Tab>
          <Tab eventKey="timer" title="Timer">
            <ToastmasterTimer greenTime={this.state.green} yellowTime={this.state.yellow} redTime={this.state.red} vibrateTime={this.state.vibrate} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}