import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Col, InputGroup, FormControl } from 'react-bootstrap';
import 'react-datetime/css/react-datetime.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { TimeConfig } from './settingPage.js';
import './App.css';


class TimerSetting extends React.Component {


    constructor(props) {
        super(props)
        this.timeName = "name";
        this.timeGreenId = "timeGreen";
        this.timeYellowId = "timeYellow";
        this.timeRedId = "timeRed";
        this.timeVibrateId = "timeVibrate";

        this.state = {
            nameText: this.props.timerConfiguration.name,
            canEditName: true,
        }

        this.onRunClicked = this.onRunClicked.bind(this);
        this.onDeleteClicked = this.onDeleteClicked.bind(this);
        this.onTimePickerChanged = this.onTimePickerChanged.bind(this);
        this.onNameEditClicked = this.onNameEditClicked.bind(this);
        this.onNameSaveClicked = this.onNameSaveClicked.bind(this);
        this.onNameChanged = this.onNameChanged.bind(this);
    }

    componentDidMount() {
        if (this.props.onInitialRun) {
            const { name, green, yellow, red, vibrate } = this.props.timerConfiguration;
            this.props.onInitialRun({ name, green, yellow, red, vibrate });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.timerConfiguration.name !== this.props.timerConfiguration.name) {
            this.setState({
                nameText: this.props.timerConfiguration.name,
            })
        }
    }

    onRunClicked() {
        this.props.handleSelect(this.props.id);
    }

    onDeleteClicked() {
        this.props.handleDelete(this.props.id);
    }

    convertTimeToMs(e) {
        let time = e.split(":");
        try {
            if (e) {
                return ((parseInt(time[0]) * 60) + parseInt(time[1])) * 1000
            }
            else {
                return this.convertTimeToMs(moment("2017-11-27T00:00:00"));
            }
        } catch (error) {
            return null
        }
    }

    onTimePickerChanged(timePickerElement, timePickerId) {
        let newTime = this.convertTimeToMs(timePickerElement.value);
        let newTimeConfig = new TimeConfig(
            this.state.nameText,
            timePickerId === this.timeGreenId ? newTime : this.props.timerConfiguration.green,
            timePickerId === this.timeYellowId ? newTime : this.props.timerConfiguration.yellow,
            timePickerId === this.timeRedId ? newTime : this.props.timerConfiguration.red,
            timePickerId === this.timeVibrateId ? newTime : this.props.timerConfiguration.vibrate,
        )

        this.props.onTimerConfigurationChanged(this.props.id, newTimeConfig);
    }

    msToMinutesAndSeconds(ms) {
        let minutes = Math.floor(ms / 60000);
        let seconds = ((ms % 60000) / 1000).toFixed(0);
        return moment("2017-11-27T00:" + (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds);
    }

    onNameEditClicked() {
        this.setState({
            canEditName: false
        })
        const input = document.getElementById(`nameTextBox${this.props.id}`);
        input.focus();
        input.select();
    }

    onNameSaveClicked(nameTextBox) {
        let newTimeName = new TimeConfig(
            nameTextBox.value,
            this.props.timerConfiguration.green,
            this.props.timerConfiguration.yellow,
            this.props.timerConfiguration.red,
            this.props.timerConfiguration.vibrate,
        )
        this.props.onTimerConfigurationChanged(this.props.id, newTimeName);
        this.setState({
            canEditName: true
        })
    }

    onNameChanged(e) {
        this.setState({
            nameText: e.target.value,
        })
    }

    render() {
        let timerConfiguration = this.props.timerConfiguration;
        let timerSecondStep = 15;

        return (
            <div>
                <Form id={`form${this.props.id}`}>
                    <Form.Row>
                        <Form.Group as={Col} className="timer-name-group">
                            <InputGroup size="sm" className="mb-3">
                                <FormControl
                                    id={`nameTextBox${this.props.id}`}
                                    value={this.state.nameText}
                                    aria-label="Timer name"
                                    aria-describedby="basic-addon2"
                                    type="text"
                                    readOnly={this.state.canEditName}
                                    className={`timer-name${this.props.id}`}
                                    onChange={(e) => this.onNameChanged(e)}
                                />
                                <InputGroup.Append>
                                    {
                                        this.state.canEditName ? (
                                            <Button onClick={this.onNameEditClicked} variant="outline-secondary">Edit</Button>
                                        ) : (
                                                <Button onClick={(e) => this.onNameSaveClicked(document.querySelector(`.timer-name${this.props.id}`))} variant="outline-secondary">Save</Button>
                                            )
                                    }

                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                        <Col></Col>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGreen">
                            <Form.Label>Green</Form.Label>
                            <TimePicker id={this.timeGreenId}
                                onClose={(e) => this.onTimePickerChanged(document.querySelector(".rc-time-picker-panel-input"), this.timeGreenId)}
                                showTime={{ format: 'mm:ss' }} showHour={false} format="mm:ss" secondStep={timerSecondStep} value={this.msToMinutesAndSeconds(timerConfiguration.green) || moment("2017-11-27T00:05:00")} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formYellow">
                            <Form.Label>Yellow</Form.Label>
                            <TimePicker id={this.timeYellowId}
                                onClose={(e) => this.onTimePickerChanged(document.querySelector(".rc-time-picker-panel-input"), this.timeYellowId)}
                                showTime={{ format: 'mm:ss' }} showHour={false} format="mm:ss" secondStep={timerSecondStep} value={this.msToMinutesAndSeconds(timerConfiguration.yellow) || moment("2017-11-27T00:06:00")} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formRed">
                            <Form.Label>Red</Form.Label>
                            <TimePicker id={this.timeRedId}
                                onClose={(e) => this.onTimePickerChanged(document.querySelector(".rc-time-picker-panel-input"), this.timeRedId)}
                                showTime={{ format: 'mm:ss' }} showHour={false} format="mm:ss" secondStep={timerSecondStep} value={this.msToMinutesAndSeconds(timerConfiguration.red) || moment("2017-11-27T00:07:00")} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formVibrateDelay" hidden>
                            <Form.Label>Late Interval</Form.Label>
                            <TimePicker id={this.timeVibrateId}
                                onClose={(e) => this.onTimePickerChanged(document.querySelector(".rc-time-picker-panel-input"), this.timeVibrateId)}
                                showTime={{ format: 'ss' }} showHour={false} showMinute={false} format="ss" secondStep={5} value={this.msToMinutesAndSeconds(timerConfiguration.vibrate) || moment("2017-11-27T00:00:30")} />
                        </Form.Group>
                    </Form.Row>
                    <div className="form-button-container">
                        <Button variant="primary" onClick={this.onDeleteClicked}>
                            Delete
                        </Button>
                        <Button variant="primary" onClick={this.onRunClicked}>
                            Run
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default TimerSetting