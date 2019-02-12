import React, { useState, useEffect } from 'react';
import { padStart } from 'lodash';

import './TimeFromNow.scss';
import TickService from '../services/TickService';

function TimeFromNow(props) {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const handle = TickService.subscribe(now => setNow(now));
        return () => handle();
    }, []);

    const seconds = Math.floor((new Date(props.datetime) - now) / 1000);
    const isPassed = seconds < 0;
    const absoluteSeconds = Math.abs(seconds);
    const ago = isPassed ? <span>ago</span> : null;
    const passedClass = isPassed ? 'TimeFromNow-passed' : '';

    if (absoluteSeconds < 60) {
        return (
            <div className={`TimeFromNow ${passedClass}`}>
                <div className="TimeFromNow-time">{absoluteSeconds}</div>
                <div className="TimeFromNow-subtitle">sec {ago}</div>
            </div>
        );
    }

    const minutes = Math.floor(absoluteSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const minutesToTheHour = padStart(minutes % 60, 2, '0');

    if (hours) {
        return (
            <div className={`TimeFromNow ${passedClass}`}>
                <div className="TimeFromNow-time">
                    {hours}h{minutesToTheHour}
                </div>
                <div className="TimeFromNow-subtitle">{ago}</div>
            </div>
        );
    }

    return (
        <div className={`TimeFromNow ${passedClass}`}>
            <div className="TimeFromNow-time">{minutes}</div>
            <div className="TimeFromNow-subtitle">min {ago}</div>
        </div>
    );
}

export default TimeFromNow;
