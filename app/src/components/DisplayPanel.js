import React, { useState, useEffect } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';

import './DisplayPanel.scss';
import NextTripsService from '../services/NextTripsService';
import Trip from './Trip';

function DisplayPanel(props) {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const handle = NextTripsService.subscribe(trips => setTrips(trips));
        return () => handle();
    }, []);

    return (
        <div className="DisplayPanel">
            <IconButton className="DisplayPanel-settings-btn" aria-label="Settings" title="Settings" onClick={props.onEdit}>
                <SettingsIcon />
            </IconButton>
            <div className="DisplayPanel-content">
                {trips.map(trip => (
                    <Trip trip={trip} key={trip.definition.id} />
                ))}
            </div>
        </div>
    );
}

export default DisplayPanel;
