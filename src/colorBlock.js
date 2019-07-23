import React from 'react';
import './App.css';

class ColorBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            color: "white"
        }

    }

    render() {
        const style = {
            height: '100px',
            backgroundColor: 'bold'

          };
          
          if(this.state.color === "green"){
            style.backgroundColor='green';
          } else if (this.state.color === "yellow"){
            style.backgroundColor='yellow'
          } else if (this.state.color === "red"){
            style.backgroundColor='red'
          }

        return (
            <div>
                <div style={style} id="bigBox"></div>
            </div>
        )
    }
}

export default ColorBlock