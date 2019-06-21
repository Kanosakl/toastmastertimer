import React from 'react';
import './App.css';
import { MyTimer } from './mytimer.js';

export class App extends React.Component {

  render() {
    return (
      <div className="App">
        <MyTimer checkpoints={[{ time: msConverter({seconds:3}), callback: () => console.log("hi") }]} />
      </div>
    );
  }
}

function msConverter({ milliseconds = 0, seconds = 0, minutes = 0, hours = 0 }:
  { milliseconds?: number, seconds?: number, minutes?: number, hours?: number }) {
    return milliseconds + (seconds * 1000) + (minutes * 60000) + (hours * 36000) 
}

