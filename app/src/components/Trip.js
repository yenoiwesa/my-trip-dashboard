import React from 'react';
import TripOriginIcon from '@material-ui/icons/TripOrigin';
import LensIcon from '@material-ui/icons/Lens';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import './Trip.scss';
import Schedule from './Schedule';

function Trip(props) {
    const { trip } = props;
    let scheduleIndex = 0;
    return (
        <div className="Trip">
            <div className="Trip-heading">
                <h2 className="Trip-title">{trip.definition.title}</h2>
                <div className="Trip-details">
                    <div className="Trip-origin">{trip.definition.origin.name}</div>
                    <div className="Trip-connection">
                        <TripOriginIcon />
                        <MoreHorizIcon className="Trip-dot" />
                        <LensIcon />
                    </div>
                    <div className="Trip-destination">{trip.definition.destination.name}</div>
                </div>
            </div>
            <ul className="Trip-schedules">
                {trip.schedules.map(schedule => (
                    <li key={scheduleIndex++}>
                        <Schedule schedule={schedule} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Trip;
