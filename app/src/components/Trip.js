import React, { useState, useEffect } from 'react';
import TripOriginIcon from '@material-ui/icons/TripOrigin';
import LensIcon from '@material-ui/icons/Lens';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import './Trip.scss';
import Schedule from './Schedule';

const REFRESH_TIME = 1 * 60 * 1000;

function Trip(props) {
    const { trip } = props;
    const [schedules, setSchedules] = useState([]);
    useEffect(() => {
        fetchSchedules(trip, setSchedules);
        const intervalId = setInterval(() => fetchSchedules(trip, setSchedules), REFRESH_TIME);
        return () => clearInterval(intervalId);
    }, []);

    let scheduleIndex = 0;
    return (
        <div className="Trip">
            <div className="Trip-heading">
                <h2 className="Trip-title">{trip.title}</h2>
                <div className="Trip-details">
                    <div className="Trip-origin">{trip.origin.name}</div>
                    <div className="Trip-connection">
                        <TripOriginIcon />
                        <MoreHorizIcon className="Trip-dot" />
                        <LensIcon />
                    </div>
                    <div className="Trip-destination">{trip.destination.name}</div>
                </div>
            </div>
            <ul className="Trip-schedules">
                {schedules.map(schedule => (
                    <li key={scheduleIndex++}>
                        <Schedule schedule={schedule} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

async function fetchSchedules(tripDefinition, setSchedules) {
    let schedules;
    try {
        const url = new URL('/api/trips', window.location.href);
        tripDefinition.toQueryParams(url);
        const response = await fetch(url);
        schedules = await response.json();
    } catch (error) {
        schedules = [];
    }

    setSchedules(schedules);
}

export default Trip;
