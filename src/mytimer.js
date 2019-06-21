import React from 'react';
import Timer from 'react-compound-timer';


export class MyTimer extends React.Component {

    render() {
        const {checkpoints, ...restProps} = this.props;
        return (
            <div>
                <Timer {...restProps} checkpoints={this.props.checkpoints}>
                    <Timer.Minutes formatValue={value => `${value}m `} />
                    <Timer.Seconds formatValue={value => `${value}s`} />
                </Timer>
            </div>
        )
    }
}