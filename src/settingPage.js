import React from 'react';
import './App.css';
import TimerSetting from './timerSetting';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class SettingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timerPanels: [],
        }
        // this.startTimer = this.startTimer.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleTimerConfigurationChanged = this.handleTimerConfigurationChanged.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleTimerConfigSave = this.handleTimerConfigSave.bind(this)
    }

    componentDidMount() {
        if(localStorage.getItem('timerSetting')){
            let panelsState = JSON.parse(localStorage.getItem('timerSetting'));
            this.setState({
                timerPanels: panelsState,
            })
        } else {
            this.setState({
                timerPanels: [new TimeConfig()],
            })
        }
    }

    handleClick(event) {
        this.setState({
            timerPanels: this.state.timerPanels.concat([new TimeConfig()])
        });
    }

    handleTimerConfigurationChanged(index, newTimerConfiguration){
        this.setState(state => {
            let [...newTimerPanels] = state.timerPanels;
            newTimerPanels[index] = newTimerConfiguration;
            return {
                timerPanels: newTimerPanels
            };
        })
    }

    handleSelect(index) {
        const { green, yellow, red, vibrate } = this.state.timerPanels[index];
        this.props.onRunClick({ green, yellow, red, vibrate });
    }

    handleDelete(index) {
        this.setState({
            timerPanels: this.state.timerPanels.splice(index, 1),
        })
    }

    handleTimerConfigSave(){
        localStorage.setItem('timerSetting', JSON.stringify(this.state.timerPanels));
    }

    render() {
        return (
            <div>
                <div className="form-button-container">
                <Button onClick={this.handleTimerConfigSave}>Save</Button>
                </div>
                <div className='panel-wrapper'>
                    {
                        this.state.timerPanels.map((timerConfig, index) => (
                            <TimerSetting {...this.props} timerConfiguration={timerConfig} id={index} key={index}
                            onTimerConfigurationChanged={this.handleTimerConfigurationChanged}
                            handleSelect={this.handleSelect} 
                            handleDelete={this.handleDelete}
                            // onInitialRun={panelId === 0? this.props.onRunClick : null}
                            />
                        ))
                    }
                </div>
                <div className="form-button-container">
                <Button onClick={this.handleClick}>Add new</Button>
                </div>
            </div>
        )
    }
}

class TimeConfig {
    constructor(green, yellow, red, vibrate){
        this.green = green || 300000;
        this.yellow = yellow || 360000;
        this.red = red || 420000;
        this.vibrate = vibrate || 30000;
    }
}

export {SettingPage, TimeConfig}