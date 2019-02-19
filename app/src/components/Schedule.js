import React from 'react';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import './Schedule.scss';
import TimeFromNow from './TimeFromNow';
import ScheduleDepArrTime from './ScheduleDepArrTime';
import Duration from './Duration';
import ScheduleTime from './ScheduleTime';
import Mode from './Mode';

function Schedule(props) {
    const { schedule } = props;

    const transportations = getTransportations(schedule);
    return (
        <div className="Schedule">
            <div className="Schedule-depart">
                <div className="Schedule-depart-title">Depart</div>
                <TimeFromNow datetime={schedule.departure.offset} />
            </div>
            <div className="Schedule-details">
                <div className="Schedule-from">{schedule.departure.name}</div>
                <div className="Schedule-transportations">{transportations}</div>
                <div className="Schedule-timing">
                    <ScheduleDepArrTime schedule={schedule} />
                    <Duration from={schedule.departure.offset} to={schedule.arrival.offset} className="Schedule-duration" />
                </div>
            </div>
            <div className="Schedule-arrive">
                <div className="Schedule-arrive-title">Arrive</div>
                <ScheduleTime datetime={schedule.arrival.offset} className="Schedule-arrive-time" />
                <div>&nbsp;</div>
            </div>
        </div>
    );
}

function getTransportations(schedule) {
    const nodes = [];
    for (let index = 0; index < schedule.transportations.length; index++) {
        const transportation = schedule.transportations[index];
        nodes.push(
            <div className="Schedule-transportation" key={transportation.id}>
                <Mode mode={transportation.mode} className="Schedule-transportation-mode" /> <span>{transportation.name}</span>
            </div>
        );

        if (index < schedule.transportations.length - 1) {
            nodes.push(<ArrowRightIcon className="Schedule-transportation-separator" key={index} />);
        }
    }

    return nodes;
}

export default Schedule;
