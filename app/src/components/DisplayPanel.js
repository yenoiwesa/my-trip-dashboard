import React, { useState, useEffect } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';

import './DisplayPanel.scss';
import TripDefinitionService from '../services/TripDefinitionService';
import Trip from './Trip';

function DisplayPanel(props) {
    const [tripDefinitions, setTripDefinitions] = useState([]);

    useEffect(() => {
        const subscription = TripDefinitionService.subscribe(tripDefs => setTripDefinitions(tripDefs));
        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className="DisplayPanel">
            <IconButton className="DisplayPanel-settings-btn" aria-label="Settings" title="Settings" onClick={props.onEdit}>
                <SettingsIcon />
            </IconButton>
            <div className="DisplayPanel-content">
                {tripDefinitions.map(tripDefinition => (
                    <Trip trip={tripDefinition} key={tripDefinition.id} />
                ))}
            </div>
        </div>
    );
}

export default DisplayPanel;
