import React from 'react';
import './App.css';
import TimerSetting from './timerSetting';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class settingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timerPanels: [0]
        }
        // this.startTimer = this.startTimer.bind(this)
    }

    handleClick(event) {
        const nextId = this.state.timerPanels.length + 1
        this.setState({
            timerPanels: this.state.timerPanels.concat([nextId])
        });
    }


    render() {        
        return (
            <div>
                <div className='panel-wrapper'>
                    {
                        this.state.timerPanels.map((panelId) => (
                            <TimerSetting {...this.props} key={panelId} id={panelId} 
                            // onInitialRun={panelId === 0? this.props.onRunClick : null}
                            />
                        ))
                    }
                </div>
                <Button onClick={this.handleClick.bind(this)}>Add new</Button>
                {/* <Button variant="primary" id="save">Save</Button> */}
            </div>
        )
    }
}

export default settingPage