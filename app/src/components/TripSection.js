import React from 'react';

import './TripSection.scss';
import Modes from './Modes';

function TripSection(props) {
    const { stop, offset } = props;

    return (
        <div className="TripSection">
            <div className="TripSection-name">{stop.name}</div>
            <div className="TripSection-details">
                <div className="TripSection-locality">{stop.locality}</div>
                <Modes modes={stop.modes} small />
            </div>
            <div className="TripSection-offset"> {offset} min walk</div>
        </div>
    );
}

export default TripSection;
