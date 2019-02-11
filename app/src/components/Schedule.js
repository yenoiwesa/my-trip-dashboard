import React from 'react';
import Paper from '@material-ui/core/Paper';

import './Schedule.scss';

function Schedule(props) {
    const { schedule } = props;
    return (
        <Paper className="Schedule" elevation={1}>
            {schedule.duration}
        </Paper>
    );
}

export default Schedule;
