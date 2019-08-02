import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Col } from 'react-bootstrap';
import 'react-datetime/css/react-datetime.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import {TimeConfig} from './settingPage.js';


class TimerSetting extends React.Component {
    constructor(props) {
        super(props)
        this.timeGreenId = "timeGreen";
        this.timeYellowId = "timeYellow";
        this.timeRedId = "timeRed";
        this.timeVibrateId = "timeVibrate";
        // this.state = {
        //     green: this.convertTimeToMs(moment("2079-11-27T00:05:00")),
        //     yellow: this.convertTimeToMs(moment("2079-11-27T00:06:00")),
        //     red: this.convertTimeToMs(moment("2079-11-27T00:07:00")),
        //     vibrateDelay: this.convertTimeToMs(moment("2079-11-27T00:00:30"))
        // }
        // this.startTimer = this.startTimer.bind(this)
        this.handleSelect = this.handleSelect.bind(this);
        this.handleOnTimePickerChange = this.handleOnTimePickerChange.bind(this);
        // this.onTimeChange = this.onTimeChange.bind(this);        
    }


    componentDidMount() {
        if (this.props.onInitialRun) {
            const { green, yellow, red, vibrate } = this.props.timerConfiguration;
            this.props.onInitialRun({ green, yellow, red, vibrate });
        }
    }

    handleSelect() {
        this.props.handleSelect(this.props.id);
    }

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
        if (e) {
            return ((e.minutes() * 60) + e.seconds()) * 1000
        }
        else {
            return this.convertTimeToMs(moment("2017-11-27T00:00:00"));
        }
    }

    handleOnTimePickerChange(e, timePickerId){
        let newTime = this.convertTimeToMs(e);
        let newTimeConfig = new TimeConfig(
             timePickerId === this.timeGreenId? newTime : this.props.timerConfiguration.green,
             timePickerId === this.timeYellowId? newTime : this.props.timerConfiguration.yellow,
             timePickerId === this.timeRedId? newTime : this.props.timerConfiguration.red,
             timePickerId === this.timeVibrateId? newTime : this.props.timerConfiguration.vibrate
        )       

        this.props.onTimerConfigurationChanged(this.props.id, newTimeConfig);
    }

    millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return moment("2017-11-27T00:"+(minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds);
      }

    render() {
        let timerConfiguration = this.props.timerConfiguration;

        return (
            <div>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGreen">
                            <Form.Label>Green</Form.Label>
                            <TimePicker id={this.timeGreenId}
                                // value={this.state.green} 
                                // onChange={(e) => { this.setState({ green: this.convertTimeToMs(e) }) }}
                                onChange={(e) => this.handleOnTimePickerChange(e, this.timeGreenId)}

                                showTime={{ format: 'mm:ss' }} showHour={false} format="mm:ss" secondStep={15} defaultValue={this.millisToMinutesAndSeconds(timerConfiguration.green) || moment("2017-11-27T00:05:00")} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formYellow">
                            <Form.Label>Yellow</Form.Label>
                            <TimePicker id={this.timeYellowId}
                                // value={this.state.yellow} 
                                // onChange={(e) => { this.setState({ yellow: this.convertTimeToMs(e) }) }}
                                onChange={(e) => this.handleOnTimePickerChange(e, this.timeYellowId)}

                                showTime={{ format: 'mm:ss' }} showHour={false} format="mm:ss" secondStep={15} defaultValue={this.millisToMinutesAndSeconds(timerConfiguration.yellow) || moment("2017-11-27T00:06:00")} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formRed">
                            <Form.Label>Red</Form.Label>
                            <TimePicker id={this.timeRedId}
                                // value={this.state.red} 
                                // onChange={(e) => { this.setState({ red: this.convertTimeToMs(e) }) }}
                                onChange={(e) => this.handleOnTimePickerChange(e, this.timeRedId)}

                                showTime={{ format: 'mm:ss' }} showHour={false} format="mm:ss" secondStep={15} defaultValue={this.millisToMinutesAndSeconds(timerConfiguration.red) || moment("2017-11-27T00:07:00")} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formVibrateDelay">
                            <Form.Label>Late Interval</Form.Label>
                            <TimePicker id={this.timeVibrateId}
                                // value={this.state.vibrateDelay} 
                                // onChange={(e) => { this.setState({ vibrateDelay: this.convertTimeToMs(e) }) }}
                                onChange={(e) => this.handleOnTimePickerChange(e, this.timeVibrateId)}

                                showTime={{ format: 'ss' }} showHour={false} showMinute={false} format="ss" secondStep={5} defaultValue={this.millisToMinutesAndSeconds(timerConfiguration.vibrate) || moment("2017-11-27T00:00:30")}
                            // onOpen={this.openIntervalCss} 
                            // onClose={this.closeIntervalCss}
                            />
                        </Form.Group>
                    </Form.Row>
                    <div className="form-button-container">
                        <Button variant="primary" onClick={this.handleDelete}>
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