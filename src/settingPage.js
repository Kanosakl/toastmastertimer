import React from 'react';
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
        this.onTimerRunClicked = this.onTimerRunClicked.bind(this)
        this.onTimerPanelDelete = this.onTimerPanelDelete.bind(this)
        this.onTimerConfigurationChanged = this.onTimerConfigurationChanged.bind(this)
        this.onAddNewTimerPanelClicked = this.onAddNewTimerPanelClicked.bind(this)
        this.onTimerConfigSave = this.onTimerConfigSave.bind(this)
    }

    componentDidMount() {
        if (localStorage.getItem('timerSetting')) {
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

    onAddNewTimerPanelClicked(event) {
        this.setState({
            timerPanels: this.state.timerPanels.concat([new TimeConfig("default" + this.state.timerPanels.length)]),
        });
    }

    onTimerConfigurationChanged(index, newTimerConfiguration) {
        this.setState(state => {
            let [...newTimerPanels] = state.timerPanels;
            newTimerPanels[index] = newTimerConfiguration;
            return {
                timerPanels: newTimerPanels
            };
        })
    }

    onTimerRunClicked(index) {
        const { name, green, yellow, red, vibrate } = this.state.timerPanels[index];
        this.props.onRunClick({ name, green, yellow, red, vibrate });
    }

    onTimerPanelDelete(index) {
        let timerState = this.state.timerPanels.filter((element, i) => i !== index);
        this.setState({
            timerPanels: timerState,
        })
    }

    onTimerConfigSave() {
        localStorage.setItem('timerSetting', JSON.stringify(this.state.timerPanels));
    }

    exportToJsonFile() {
        let dataStr = localStorage.getItem('timerSetting');
        let dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;

        let exportFileDefaultName = 'timer_setting.json';

        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    importToJsonFile(files) {
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
                    <Button onClick={this.onTimerConfigSave}>Save</Button>
                    <Button onClick={this.exportToJsonFile} >Export</Button>
                    <ReactFileReader handleFiles={this.importToJsonFile} fileTypes={[".json"]}>
                        <Button className='btn'>Import</Button>
                    </ReactFileReader>
                </div>
                <div className='panel-wrapper'>
                    {
                        this.state.timerPanels.map((timerConfig, index) => (
                            <TimerSetting {...this.props}
                                timerConfiguration={timerConfig}
                                id={index}
                                key={index}
                                onTimerConfigurationChanged={this.onTimerConfigurationChanged}
                                handleSelect={this.onTimerRunClicked}
                                handleDelete={this.onTimerPanelDelete}
                            />
                        ))
                    }
                </div>
                <div className="form-button-container">
                    <Button onClick={this.onAddNewTimerPanelClicked}>Add new</Button>
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