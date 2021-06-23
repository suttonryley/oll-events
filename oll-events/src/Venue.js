import React from 'react';
import './Venue.css';

// having a separate class for Venue allows better control of the 
//div we want to hide and show
class Venue extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            isClicked : false, 
        };
    }

    // Allows toggling of div
    handleClick() {
        if (!this.state.isClicked) {
            this.setState({ isClicked: true });
        }
        else {
            this.setState({ isClicked: false });
        }
    }

    //when button is clicked, it changes the state to show the hidden div
    render() {
        return <tr>
            <button onClick={() => this.handleClick()}>
                {this.props.venue.name}
            </button>
            <div style={this.state.isClicked ? {} : { display: 'none' }}>
                <img src={this.props.venue.icon} alt="No picture" /> <br />
                {this.props.venue.address}
            </div>
        </tr >
    }
}

export default Venue; 