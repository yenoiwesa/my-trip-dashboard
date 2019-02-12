import React from 'react';
import { padStart } from 'lodash';

import './ScheduleTime.scss';

function ScheduleTime(props) {
    const datetime = new Date(props.datetime);
    return (
        <div className={`ScheduleTime ${props.className || ''}`}>
            {datetime.getHours()}:{padStart(datetime.getMinutes(), 2, '0')}
        </div>
    );
}

export default ScheduleTime;
