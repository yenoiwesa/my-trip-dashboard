import React from 'react';
import { padStart } from 'lodash';

function Duration(props) {
    const { from, to, className } = props;
    const seconds = Math.abs(Math.floor((new Date(to) - new Date(from)) / 1000));

    let content;
    if (seconds < 60) {
        content = <span>{seconds} sec</span>;
    } else {
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const minutesToTheHour = padStart(minutes % 60, 2, '0');

        if (hours) {
            content = (
                <span>
                    {hours}h{minutesToTheHour}
                </span>
            );
        } else {
            content = <span>{minutes} min</span>;
        }
    }

    return <div className={`Duration ${className || ''}`}>{content}</div>;
}

export default Duration;
