import React from 'react';
import './App.css';
import TimerSetting from './timerSetting';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactFileReader from 'react-file-reader';
import './App.css';

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
                timerPanels: [new TimeConfig("default" + this.state.timerPanels.length)],
            })
        }
    }

    handleClick(event) {
        this.setState({
            timerPanels: this.state.timerPanels.concat([new TimeConfig("default" + this.state.timerPanels.length)]),
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
        const { name, green, yellow, red, vibrate } = this.state.timerPanels[index];
        this.props.onRunClick({ name, green, yellow, red, vibrate });
    }

    handleDelete(index) {
        let timerState = this.state.timerPanels.filter( (element,i) => i !== index);
        this.setState({
            timerPanels: timerState,
        })
    }

    handleTimerConfigSave(){
        localStorage.setItem('timerSetting', JSON.stringify(this.state.timerPanels));
    }

    exportToJsonFile() {
        let dataStr = localStorage.getItem('timerSetting');
        let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        let exportFileDefaultName = 'timer_setting.json';

        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    importToJsonFile = files => {
        let reader = new FileReader();
        reader.readAsText(files[0]);
        reader.onload = e => {
            let json = JSON.parse(e.target.result);
            this.setState({
                timerPanels: json,
            })
        };
    }

    render() {
        return (
            <div>
                <div className="form-button-container">
                <Button onClick={this.handleTimerConfigSave}>Save</Button>
                    <Button onClick={this.exportToJsonFile} >Export</Button>
                    <ReactFileReader handleFiles={this.importToJsonFile} fileTypes={[".json"]}>
                        <Button className='btn'>Import</Button>
                    </ReactFileReader>
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
    constructor(name, green, yellow, red, vibrate) {
        this.name = name || "default";
        this.green = green || 300000;
        this.yellow = yellow || 360000;
        this.red = red || 420000;
        this.vibrate = vibrate || 30000;
    }
}

export { SettingPage, TimeConfig }