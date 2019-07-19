import React from 'react';
import './App.css';
import prettyMilliseconds from 'pretty-ms';
// import { tsImportEqualsDeclaration } from '@babel/types';

class TimerTest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            time: 0,
            start: 0,
            isRunning: false,
        }
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)

        this.greenAlert = null;
        this.yellowAlert = null;
        this.redAlert = null;
    }
    startTimer() {
        this.setState({
            time: this.state.time,
            start: Date.now() - this.state.time,
            isRunning: true
        })
        this.timerTick = setInterval(() => this.setState({
            time: Date.now() - this.state.start
        }), 1000);
        this.greenAlert = setTimeout(() => this.vibrate(1000), this.props.green);
        this.yellowAlert = setTimeout(() => this.vibrate(1000), this.props.yellow);
        this.redAlert = setTimeout(() => {
            this.vibrate(1000);
            this.alertLoop();
        }, this.props.red);

    }

    alertLoop() {
        this.intervalVibrate = setInterval(() => this.vibrate(1000), this.props.vibrateTime);
    }

    stopTimer() {
        this.setState({ isRunning: false });
        clearInterval(this.timerTick);
        clearInterval(this.intervalVibrate);
        clearTimeout(this.greenAlert);
        clearTimeout(this.yellowAlert);
        clearTimeout(this.redAlert);

    }

    resetTimer() {
        this.setState({ time: 0 })
    }

    vibrate(duration) {
        if (Navigator.vibrate) {
            Navigator.vibrate(duration);
        }
    }

    render() {
        let start = (this.state.time === 0) ?
            <button onClick={this.startTimer}>start</button> :
            null
        let stop = (this.state.isRunning) ?
            <button onClick={this.stopTimer}>stop</button> :
            null
        let reset = (this.state.time !== 0 && !this.state.isRunning) ?
            <button onClick={this.resetTimer}>reset</button> :
            null
        //   let resume = (this.state.time != 0 && !this.state.isOn) ?
        //     <button onClick={this.startTimer}>resume</button> :
        //     null
        let runTime = (this.state.time !== 0 && !this.state.isRunning) ?
            <span>Time: {prettyMilliseconds(this.state.time)}</span> : null

        let overTime = (this.state.time !== 0 && !this.state.isRunning && this.state.time > this.state.red) ?
            <span>OverTime: {prettyMilliseconds(this.state.time - this.state.red)}</span> : null

        return (
            <div>
                <h3>{prettyMilliseconds(this.state.time)}</h3>
                {start}
                {/* {resume} */}
                {runTime}
                {overTime}
                {stop}
                {reset}
            </div>
        )
    }
}

export default TimerTest