import React from 'react';
import { pad } from 'lodash';

function TimeFromNow(props) {
    const datetime = new Date(props.datetime);
    const now = new Date();
    let seconds = Math.floor((datetime - now) / 1000);

    const ago = seconds < 0 ? <span>ago</span> : null;
    seconds = Math.abs(seconds);

    if (seconds < 60) {
        return (
            <div className="TimeFromNow">
                {seconds} secs {ago}
            </div>
        );
    }

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const minutesToTheHour = pad(minutes % 60, 2, '0');

    if (hours) {
        return (
            <div className="TimeFromNow">
                {hours}h{minutesToTheHour} {ago}
            </div>
        );
    }

    return (
        <div className="TimeFromNow">
            {minutes} mins {ago}
        </div>
    );
}

export default TimeFromNow;
