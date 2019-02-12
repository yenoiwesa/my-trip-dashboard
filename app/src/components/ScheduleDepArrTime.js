import React from 'react';

import './ScheduleDepArrTime.scss';
import ScheduleTime from './ScheduleTime';

const LATE_THRESHOLD = 30 * 1000;

function ScheduleDepArrTime(props) {
    const { schedule } = props;
    const isDepartureLate = new Date(schedule.departure.estimated) - new Date(schedule.departure.planned) > LATE_THRESHOLD;
    const isArrivalLate = new Date(schedule.arrival.estimated) - new Date(schedule.arrival.planned) > LATE_THRESHOLD;

    return (
        <div className="ScheduleDepArrTime">
            <ScheduleTime
                datetime={schedule.departure.estimated}
                className={`ScheduleDepArrTime-departure ${isDepartureLate ? 'ScheduleDepArrTime-departure-late' : ''}`}
            />
            <div className="ScheduleDepArrTime-separator">-</div>
            <ScheduleTime
                datetime={schedule.arrival.estimated}
                className={`ScheduleDepArrTime-arrival ${isArrivalLate ? 'ScheduleDepArrTime-arrival-late' : ''}`}
            />
        </div>
    );
}

export default ScheduleDepArrTime;
