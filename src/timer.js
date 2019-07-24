import React from 'react';
import './App.css';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elapsedTime: null
        };

        this.countUp = this.countUp.bind(this);
        this.startCounting = this.startCounting.bind(this);
    }

    startCounting() {
        setInterval(this.countUp, 1000);
    }

    countUp() {
        this.setState(({ elapsedTime }) => ({ elapsedTime: elapsedTime + 1 }));
    }

    render() {
        return (
            <div class="countup" id="countup1">
                <div>{this.state.elapsedTime}</div>
                {!this.state.elapsedTime && (
          <button onClick={this.startCounting}>Start</button>
        )}
            </div>
        )
    }
}

export default Timer