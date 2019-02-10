import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';

import TripDefinitionsService from '../services/TripDefinitionService';
import './EditPanel.scss';
import TripDefinitionForm from './TripDefinitionForm';

function EditPanel(props) {
    const [tripDefinitions, setTripDefinitions] = useState([]);
    useEffect(() => {
        const observer = TripDefinitionsService.subscribe(tripDefinitions => setTripDefinitions(tripDefinitions));
        return () => observer.unsubscribe();
    }, []);

    let tripDetails;
    if (tripDefinitions.length) {
        tripDetails = (
            <ul>
                {tripDefinitions.map(tripDefinition => (
                    <span>{tripDefinition.title}</span>
                ))}
            </ul>
        );
    } else {
        tripDetails = <div>No trips added yet</div>;
    }

    return (
        <div>
            <Paper>
                <TripDefinitionForm elevation={1} />
            </Paper>
            <div className="EditPanel-trip-details">{tripDetails}</div>
        </div>
    );
}

export default EditPanel;
