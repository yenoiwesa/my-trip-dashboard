import React from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import './TripDefinition.scss';
import TripSection from './TripSection';

function TripDefinition(props) {
    const { trip } = props;

    return (
        <Paper className="TripDefinition" elevation={1}>
            <div className="TripDefinition-title">{trip.title}</div>
            <Divider />
            <div className="TripDefinition-content">
                <div className="TripDefinition-details">
                    <TripSection stop={trip.origin} offset={trip.originOffset} />
                    <div className="TripDefinition-divider">
                        <ArrowRightIcon />
                    </div>
                    <TripSection stop={trip.destination} offset={trip.destinationOffset} />
                </div>
                <div className="TripDefinition-actions">
                    <IconButton title="Delete trip" aria-label="Delete trip" onClick={() => props.onDelete(trip)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
        </Paper>
    );
}

export default TripDefinition;
