import React from 'react';

import './TripSection.scss';
import Mode from './Mode';

function TripSection(props) {
    const { stop, offset } = props;

    return (
        <div className="TripSection">
            <div className="TripSection-name">{stop.name}</div>
            <div className="TripSection-details">
                <div className="TripSection-locality">{stop.locality}</div>
                {stop.modes.map(mode => (
                    <Mode mode={mode} small key={mode} className="TripSection-mode" />
                ))}
            </div>
            <div className="TripSection-offset"> {offset} min walk</div>
        </div>
    );
}

export default TripSection;
