import React from 'react';
import './Table.css';
import Rows from './Rows.js'; 

//NOTE: I was unable to figure out how to get the date to parse correctly,
// so that is a bug, and it doesn't sort on date
class Table extends React.Component {
    constructor() {
        super();
        this.state = {
            artistError: null,
            isArtistLoaded: false,
            artistItems: [],
            eventError: null,
            isEventLoaded: false,
            eventItems: [],
            venueError: null,
            isVenueLoaded: null,
            venueItems: [],
            optionSelected: null,
        }
    }

    // This fetches the JSON data and builds the 
    componentDidMount() {
        fetch("https://oll-coding-exercise.s3-us-west-2.amazonaws.com/artists.json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isArtistLoaded: true,
                        artistItems: result,
                    });
                },
                (error) => {
                    this.setState({
                        isArtistLoaded: true,
                        artistError: error,
                    });
                }
            )

        fetch("https://oll-coding-exercise.s3-us-west-2.amazonaws.com/events.json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isEventLoaded: true,
                        eventItems: result,
                    });
                },
                (error) => {
                    this.setState({
                        isEventLoaded: true,
                        eventError: error,
                    });
                }
            )

        fetch("https://oll-coding-exercise.s3-us-west-2.amazonaws.com/venues.json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isVenueLoaded: true,
                        venueItems: result,
                    });
                },
                (error) => {
                    this.setState({
                        isVenueLoaded: true,
                        venueError: error,
                    });
                }
            )


    }

    // method keeps track of which radio button is selected
    onRadioChange(event) {
        this.setState({
            optionSelected : event.target.value, 
        });
    }

    render() {
        // if an error occured output corresponding error
        if (this.state.artistError || this.state.eventError || this.state.venueError) {

            if (this.state.artistError) {
                return <div>Error: {this.state.artistError.message}</div>;
            }
            else if (this.state.eventError) {
                return <div>Error: {this.state.eventError.message}</div>;
            }
            else {
                return <div>Error: {this.state.venueError.message}</div>;
            }
        }
        // if one of the JSON files isn't loaded output loading message
        else if (!this.state.isArtistLoaded || !this.state.isEventLoaded || !this.state.isVenueLoaded) {
            return <div>Loading...</div>;
        }
        // All files loaded, no errors processing normally
        else {
            return (
                <div className="Table-Header">
                    Sort By:
                    <form>
                        <div className="radio">
                            <label>
                                <input
                                    type="radio"
                                    value="Artist"
                                    name="sortRadio"
                                    onChange={(event) => this.onRadioChange(event)}
                                />
                                Artist
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input
                                    type="radio"
                                    value="Venue"
                                    name="sortRadio"
                                    onChange={(event) => this.onRadioChange(event)}
                                />
                                Venue
                            </label>
                        </div>
                    </form>
                        
                        
                        <Rows
                            eventItems={this.state.eventItems}
                            artistItems={this.state.artistItems}
                            venueItems={this.state.venueItems}
                            optionSelected={this.state.optionSelected}
                            />
                </div>
            );
        }
    }
}

export default Table; 