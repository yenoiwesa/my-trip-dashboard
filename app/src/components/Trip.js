import React from 'react';

import './Trip.scss';
import Schedule from './Schedule';

function Trip(props) {
    const { trip } = props;
    let scheduleIndex = 0;
    return (
        <div className="Trip">
            <h2 className="Trip-title">{trip.definition.title}</h2>
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
