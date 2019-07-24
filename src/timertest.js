import React from 'react';
import './App.css';
// import prettyMilliseconds from 'pretty-ms';
import millisec from 'millisec';
import {timeFormat} from "d3-time-format";
// import { tsImportEqualsDeclaration } from '@babel/types';

class TimerTest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            time: 0 , //millisec format
            start: 0,
            isRunning: false,
            colorBox: null,
            startTime: null,
            endTime: null,
        }
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)

        this.greenAlert = null;
        this.yellowAlert = null;
        this.redAlert = null;
    }
    startTimer() { debugger;
        this.setState({
            time: this.state.time,
            start: Date.now() - this.state.time,
            isRunning: true,
            startTime: new Date(),
        })
        this.timerTick = setInterval(() => this.setState({
            time: Date.now() - this.state.start
        }), 1000);
        this.greenAlert = setTimeout(() => {
            this.vibrate(2000);
            this.setColor("green");
        }, this.props.greenTime);
        this.yellowAlert = setTimeout(() => {
            this.vibrate(2000);
            this.setColor("yellow");
        }, this.props.yellowTime);
        this.redAlert = setTimeout(() => {
            this.vibrate(2000);
            this.alertLoop();
            this.setColor("red");
        }, this.props.redTime);

    }

    alertLoop() {
        this.intervalVibrate = setInterval(() => this.vibrate(1000), this.props.vibrateTime);
    }

    stopTimer() {
        this.setState({ isRunning: false, endTime: Date.now(),});
        clearInterval(this.timerTick);
        clearInterval(this.intervalVibrate);
        clearTimeout(this.greenAlert);
        clearTimeout(this.yellowAlert);
        clearTimeout(this.redAlert);
        
    }

    resetTimer() {
        this.setState({ time: 0 })
        this.setColor(null);
    }

    vibrate(duration) { 
        if (navigator.vibrate) {
            navigator.vibrate(duration);
        }
    }

    setColor(color) {
        this.setState({
            colorBox: color
        })
    }

    

    render() {
        var millisecFormat = 'mm m : ss s';
        var startTimeEndTimeFormat = timeFormat('%H : %M');

        let style = {
            height: '250px',
            backgroundColor: this.state.colorBox,
            display: 'flex'
        };

        let timerStyle = {
            flex: '0 0 auto',
            fontSize : '4.5em'
        }

        let buttonStyle = {
            height: '110px',
            width: '100%',
            bottom: '30px',
            position: 'absolute'
        }
        
        if (this.state.colorBox) {
            style.backgroundColor = this.state.colorBox;
        }

        let start = (this.state.time === 0) ?
            <button style={buttonStyle} onClick={this.startTimer}>start</button> :
            null
        let stop = (this.state.isRunning) ?
            <button style={buttonStyle} onClick={this.stopTimer}>stop</button> :
            null
        let reset = (this.state.time !== 0 && !this.state.isRunning) ?
            <button style={buttonStyle} onClick={this.resetTimer}>reset</button> :
            null
        //   let resume = (this.state.time != 0 && !this.state.isOn) ?
        //     <button onClick={this.startTimer}>resume</button> :
        //     null
        let startTimeEndTime = (this.state.time !== 0 && !this.state.isRunning) ? 
            <div>
                <div>
                    <span>Start Time: {startTimeEndTimeFormat(this.state.startTime)}</span>
                </div>
                <div>
                    <span>End Time: {startTimeEndTimeFormat(this.state.endTime)}</span>
                </div>
            </div>
            : null

        let underTime = (this.state.time !== 0 && !this.state.isRunning && this.state.time < this.props.greenTime) ?
            <span>UnderTime: {millisec(this.props.greenTime - this.state.time).format(millisecFormat)}</span> : null    

        let overTime = (this.state.time !== 0 && !this.state.isRunning && this.state.time > this.props.redTime) ?
            <span>OverTime: {millisec(this.state.time - this.props.redTime).format(millisecFormat)}</span> : null

        return (
            <div class="text1">
                <div style={style} id="bigBox"></div>
                <h3 style={timerStyle}> {millisec(this.state.time).format(millisecFormat)} </h3>
                {start}
                {startTimeEndTime}
                {overTime || underTime}
                {stop}
                {reset}
            </div>
        )
    }
}

export default TimerTest