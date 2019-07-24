import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Col } from 'react-bootstrap';
import 'react-datetime/css/react-datetime.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';


class TimerSetting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            green: this.convertTimeToMs(moment("2079-11-27T00:05:00")),
            yellow: this.convertTimeToMs(moment("2079-11-27T00:06:00")),
            red: this.convertTimeToMs(moment("2079-11-27T00:07:00")),
            vibrateDelay: this.convertTimeToMs(moment("2079-11-27T00:00:30"))
        }
        // this.startTimer = this.startTimer.bind(this)
        this.handleSelect = this.handleSelect.bind(this);
        // this.onTimeChange = this.onTimeChange.bind(this);        
    }


    componentDidMount() {
        if (this.props.onInitialRun) {
            const { green, yellow, red, vibrateDelay } = this.state;
            this.props.onInitialRun({ green, yellow, red, vibrateDelay });
        }
    }

    disabledHours() {
        const allHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
            16, 17, 18, 19, 20, 21, 22, 23]

        return allHours;
    };

    disabledMinutes() {
        const allMinutes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
            16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
            37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59
        ]

        return allMinutes;
    };

    handleSelect() {
        const { green, yellow, red, vibrateDelay } = this.state;
        this.props.onRunClick({ green, yellow, red, vibrateDelay });
    }

    convertTimeToMs(e) {
        if(e){
            return ((e.minutes() * 60) + e.seconds()) * 1000
        }
        else {
            return this.convertTimeToMs(moment("2017-11-27T00:00:00"));
        }
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGreen">
                            <Form.Label>Green</Form.Label>
                            <TimePicker id="timeGreen"
                                // value={this.state.green} 
                                onChange={(e) => { this.setState({ green: this.convertTimeToMs(e) }) }}

                                showTime={{ format: 'mm:ss' }} showHour={false} format="mm:ss" secondStep={15} defaultValue={moment("2017-11-27T00:05:00")} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formYellow">
                            <Form.Label>Yellow</Form.Label>
                            <TimePicker id="timeYellow"
                                // value={this.state.yellow} 
                                onChange={(e) => { this.setState({ yellow: this.convertTimeToMs(e) }) }}

                                showTime={{ format: 'mm:ss' }} showHour={false} format="mm:ss" secondStep={15} defaultValue={moment("2017-11-27T00:06:00")} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formRed">
                            <Form.Label>Red</Form.Label>
                            <TimePicker id="timeRed"
                                // value={this.state.red} 
                                onChange={(e) => { this.setState({ red: this.convertTimeToMs(e) }) }}

                                showTime={{ format: 'mm:ss' }} showHour={false} format="mm:ss" secondStep={15} defaultValue={moment("2017-11-27T00:07:00")} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formVibrateDelay">
                            <Form.Label>Late Interval</Form.Label>
                            <TimePicker id="timeVibrateDelay"
                                // value={this.state.vibrateDelay} 
                                onChange={(e) => { this.setState({ vibrateDelay: this.convertTimeToMs(e) }) }}
                                showTime={{ format: 'ss' }} showHour={false} showMinute={false} format="ss" secondStep={5} disabledMinutes={this.disabledMinutes} defaultValue={moment("2017-11-27T00:00:30")}
                            // onOpen={this.openIntervalCss} 
                            // onClose={this.closeIntervalCss}
                            />
                        </Form.Group>
                    </Form.Row>
                    <div class="form-button-container">
                        <Button variant="primary" >
                            Delete
                        </Button>
                        <Button variant="primary" onClick={this.handleSelect}>
                            Run
                        </Button>
                    </div>
                </Form>

            </div>
        )
    }
}

export default TimerSetting