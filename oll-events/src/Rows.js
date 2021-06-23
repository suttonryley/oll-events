import React from 'react';
import Venue from './Venue.js'; 

class Rows extends React.Component {
    constructor(props) {
        super(props); 
    }
    buildcell(artist, event, venue) {
        let cells = []; 
        //Build the Table 
        cells.push(<th> {event.date}</th>);
        cells.push(<th>{event.title}</th>);
        cells.push(<th>{artist.name}</th>);
        cells.push(<th>{artist.genre}</th>);
        cells.push(<th><Venue venue={venue}/></th>);
        cells.push(<th>${event.price}</th>);

        return cells; 
    }

    //Function builds the table
    buildTable(rows) {
        return (
            <table>
            <tr id="header">
                <th>Event Date</th>
                <th>Event Name</th>
                <th>Artist Name</th>
                <th>Artist Genre</th>
                <th>Venue</th>
                <th>Ticket Price</th>
            </tr>
            {rows}
        </table>); 
    }
    sortByArtist() {
        let artistNames = []; 
        let rows = []; 

        //put all artists names together
        this.props.artistItems.forEach((element,index) => {
            artistNames.push(element.name);
        }); 

        //sort the names by alphabetical order
        artistNames.sort(); 

        artistNames.forEach(element => {

            let cells = []; 

            //find the artist in items
            let artist = this.props.artistItems.find(({ name }) => name === element);
            let events = this.props.eventItems.filter(({ artist_id }) => artist_id === artist.id ); 

            //there could be more than one event per artist
            events.forEach(event => {
                let venue = this.props.venueItems.find(({ id }) => id === event.venue_id);

                // build the row
                cells = this.buildcell(artist, event, venue);

                //set correct id for each row
                let rowID = 'event_' + event.id;
                rows.push(<tbody id={rowID}>{cells}</tbody>)
            }); 
        }); 
        return this.buildTable(rows);             
        
    }

    sortByVenue() {
        let venueNames = [];
        let rows = [];

        //find number of venues through ids 
        this.props.venueItems.forEach((element) => {
            venueNames.push(element.name);
        });

        //sort the names by alphabetical order
        venueNames.sort();

        venueNames.forEach(element => {

            let cells = [];

            //find the venue in items
            let venue = this.props.venueItems.find(({ name }) => name === element);
            let events = this.props.eventItems.filter(({ venue_id }) => venue_id === venue.id);
            

            //there could be more than one event at the same venue
            events.forEach(event => {
                let artist = this.props.artistItems.find(({ id }) => id === event.artist_id);
                                
                // build the row                
                cells = this.buildcell(artist, event, venue);
    
                //set correct id for each row
                let rowID = 'event_' + event.id;
                rows.push(<tbody id={rowID}>{cells}</tbody>)
                    
            }); 
        });
        return this.buildTable(rows); 
    }

    unSorted() {
        //for each event
        let rows = [];

        this.props.eventItems.forEach((event) => {
            let cells = [];

            let venue = this.props.venueItems.find(({ id }) => id === event.venue_id);
            let artist = this.props.artistItems.find(({ id }) => id === event.artist_id);

            // build the row                
            cells = this.buildcell(artist, event, venue);

            //set correct id for each row
            let rowID = 'event_' + event.id;
            rows.push(<tbody id={rowID}>{cells}</tbody>)
        }); 

        return this.buildTable(rows); 

  
    }

    render() {
        if (this.props.optionSelected === 'Artist') {
            // Sort by Artist 
            return this.sortByArtist();
        }
        else if (this.props.optionSelected === 'Venue') {
            return this.sortByVenue();
        }
        else {
            return this.unSorted();
        }
    }
     
}

export default Rows; 