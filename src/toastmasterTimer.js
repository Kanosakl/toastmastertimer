import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import millisec from 'millisec';
import { timeFormat } from "d3-time-format";
import NoSleep from 'nosleep.js';

// nosleep is coded this way because of an issue in IOS https://github.com/richtr/NoSleep.js/issues/75
let nosleep = null;

class ToastmasterTimer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //all time is milliseconds format
            time: 0,
            start: 0,
            isRunning: false,
            colorBox: null,
            startTime: null,
            endTime: null,
            greenTime: null,
            redTime: null,
        }
        this.onStartTimer = this.onStartTimer.bind(this)
        this.onStopTimer = this.onStopTimer.bind(this)
        this.onResetTimer = this.onResetTimer.bind(this)
        this.noSleepEnable = this.noSleepEnable.bind(this)
        this.noSleepDisable = this.noSleepDisable.bind(this)

        this.greenAlert = null;
        this.yellowAlert = null;
        this.redAlert = null;

        this.vibrateTime = 30000;
    }

    onStartTimer() {
        this.noSleepEnable();

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
        this.intervalVibrate = setInterval(() => this.vibrate(2000), this.vibrateTime);
    }

    onStopTimer() {
        this.setState({ isRunning: false, endTime: Date.now(), greenTime: this.props.greenTime, redTime: this.props.redTime, });
        clearInterval(this.timerTick);
        clearInterval(this.intervalVibrate);
        clearTimeout(this.greenAlert);
        clearTimeout(this.yellowAlert);
        clearTimeout(this.redAlert);
        this.noSleepDisable();
    }

    onResetTimer() {
        this.setState({ time: 0, greenTime: null, redTime: null, })
        this.setColor(null);
    }

    vibrate(duration) {
        if (navigator.vibrate) {
            navigator.vibrate(duration);
        } else {
            console.log(`vibrating for ${duration}ms`);
        }
    }

    setColor(color) {
        this.setState({
            colorBox: color
        })
    }

    noSleepEnable() {
        if (nosleep) nosleep.disable();
        nosleep = new NoSleep();
        nosleep.enable();
    }

    noSleepDisable() {
        nosleep.disable();
    }

    render() {
        // format "mm m ss s" = "09 m 59 s"
        const millisecFormat = 'mm m ss s';
        const startTimeEndTimeFormat = timeFormat('%H : %M');

        let style = {
            height: '250px',
            backgroundColor: this.state.colorBox,
            display: 'flex'
        };

        let timerStyle = {
            flex: '0 0 auto',
            fontSize: '4.5em'
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
            <Button style={buttonStyle} onClick={this.onStartTimer}>start</Button>
            : null;

        let stop = (this.state.isRunning) ?
            <Button style={buttonStyle} onClick={this.onStopTimer}>stop</Button>
            : null;

        let reset = (this.state.time !== 0 && !this.state.isRunning) ?
            <Button style={buttonStyle} onClick={this.onResetTimer}>reset</Button>
            : null;

        let startTimeEndTime = (this.state.time !== 0 && !this.state.isRunning) ?
            <div>
                <div>
                    <span>Start Time: {startTimeEndTimeFormat(this.state.startTime)}</span>
                </div>
                <div>
                    <span>End Time: {startTimeEndTimeFormat(this.state.endTime)}</span>
                </div>
            </div>
            : null;

        // use state to store time to prevent props.greenTime from modifying the previous time report
        let greenTime = this.state.greenTime || this.props.greenTime;

        let underTime = (this.state.time !== 0 && !this.state.isRunning && this.state.time < greenTime) ?
            <span>UnderTime: {millisec(greenTime - this.state.time).format(millisecFormat)}</span>
            : null;

        let redTime = this.state.redTime || this.props.redTime;

        let overTime = (this.state.time !== 0 && !this.state.isRunning && this.state.time > redTime) ?
            <span>OverTime: {millisec(this.state.time - redTime).format(millisecFormat)}</span>
            : null;

        return (
            <div className="timer-text">
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

export default ToastmasterTimer