import React from 'react';

import './Schedule.scss';
import TimeFromNow from './TimeFromNow';

function Schedule(props) {
    const { schedule } = props;
    return (
        <div className="Schedule">
            <div className="Schedule-depart">
                <div>Depart</div>
                <TimeFromNow datetime={schedule.departure.offset} />
            </div>
            <div />
        </div>
    );
}

export default Schedule;
