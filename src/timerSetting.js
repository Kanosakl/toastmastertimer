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
        // this.state = {
        //     green: this.convertTimeToMs(moment("2079-11-27T00:05:00")),
        //     yellow: this.convertTimeToMs(moment("2079-11-27T00:06:00")),
        //     red: this.convertTimeToMs(moment("2079-11-27T00:07:00")),
        //     vibrateDelay: this.convertTimeToMs(moment("2079-11-27T00:00:30"))
        // }
        // this.startTimer = this.startTimer.bind(this)
        this.handleSelect = this.handleSelect.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleOnTimePickerChange = this.handleOnTimePickerChange.bind(this);
        this.handleNameEdit = this.handleNameEdit.bind(this);
        this.handleNameSave = this.handleNameSave.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        // this.onTimeChange = this.onTimeChange.bind(this);        
    }


    componentDidMount() {
        if (this.props.onInitialRun) {
            const { name, green, yellow, red, vibrate } = this.props.timerConfiguration;
            this.props.onInitialRun({ name, green, yellow, red, vibrate });
        }
    }

    handleSelect() {
        this.props.handleSelect(this.props.id);
    }

    handleDelete() {
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

    handleOnTimePickerChange(timePickerElement, timePickerId) {
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

    millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return moment("2017-11-27T00:" + (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds);
    }

    handleNameEdit() {
        this.setState({
            canEditName: false
        })
    }

    handleNameSave(nameTextBox) {
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

    handleNameChange(e) {
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
                                    id={"nameTextBox" + this.props.id}
                                    value={this.state.nameText}
                                    aria-label="Timer name"
                                    aria-describedby="basic-addon2"
                                    type="text"
                                    readOnly={this.state.canEditName}
                                    className={"timer-name"+this.props.id+""}
                                    onChange={(e) => this.handleNameChange(e)}
                                />
                                <InputGroup.Append>
                                    {/* <Button onClick={this.handleNameEdit} variant="outline-secondary">{this.state.canEditName ? "Edit" : "Save"}</Button> */}
                                    {
                                        this.state.canEditName ? (
                                            <Button onClick={this.handleNameEdit} variant="outline-secondary">Edit</Button>
                                        ) : (
                                            <Button onClick={(e) => this.handleNameSave(document.querySelector(".timer-name"+this.props.id+""))} variant="outline-secondary">Save</Button>
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
                                // value={this.state.green} 
                                // onChange={(e) => { this.setState({ green: this.convertTimeToMs(e) }) }}
                                onClose={(e) => this.handleOnTimePickerChange(document.querySelector(".rc-time-picker-panel-input"), this.timeGreenId)}

                                showTime={{ format: 'mm:ss' }} showHour={false} format="mm:ss" secondStep={timerSecondStep} value={this.millisToMinutesAndSeconds(timerConfiguration.green) || moment("2017-11-27T00:05:00")} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formYellow">
                            <Form.Label>Yellow</Form.Label>
                            <TimePicker id={this.timeYellowId}
                                // value={this.state.yellow} 
                                // onChange={(e) => { this.setState({ yellow: this.convertTimeToMs(e) }) }}
                                onClose={(e) => this.handleOnTimePickerChange(document.querySelector(".rc-time-picker-panel-input"), this.timeYellowId)}

                                showTime={{ format: 'mm:ss' }} showHour={false} format="mm:ss" secondStep={timerSecondStep} value={this.millisToMinutesAndSeconds(timerConfiguration.yellow) || moment("2017-11-27T00:06:00")} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formRed">
                            <Form.Label>Red</Form.Label>
                            <TimePicker id={this.timeRedId}
                                // value={this.state.red} 
                                // onChange={(e) => { this.setState({ red: this.convertTimeToMs(e) }) }}
                                onClose={(e) => this.handleOnTimePickerChange(document.querySelector(".rc-time-picker-panel-input"), this.timeRedId)}

                                showTime={{ format: 'mm:ss' }} showHour={false} format="mm:ss" secondStep={timerSecondStep} value={this.millisToMinutesAndSeconds(timerConfiguration.red) || moment("2017-11-27T00:07:00")} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formVibrateDelay" hidden>
                            <Form.Label>Late Interval</Form.Label>
                            <TimePicker id={this.timeVibrateId}
                                // value={this.state.vibrateDelay} 
                                // onChange={(e) => { this.setState({ vibrateDelay: this.convertTimeToMs(e) }) }}
                                onClose={(e) => this.handleOnTimePickerChange(document.querySelector(".rc-time-picker-panel-input"), this.timeVibrateId)}

                                showTime={{ format: 'ss' }} showHour={false} showMinute={false} format="ss" secondStep={5} value={this.millisToMinutesAndSeconds(timerConfiguration.vibrate) || moment("2017-11-27T00:00:30")}
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