import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';

import TripDefinitionsService from '../services/TripDefinitionService';
import './EditPanel.scss';
import TripDefinitionForm from './TripDefinitionForm';
import TripDefinition from './TripDefinition';

const SortableTripDefinition = sortableElement(({ value }) => (
    <TripDefinition trip={value} onDelete={trip => TripDefinitionsService.removeTrip(trip)} />
));
const SortableTripContainer = sortableContainer(({ children }) => <ul className="EditPanel-trip-details-list">{children}</ul>);

function EditPanel(props) {
    const [tripDefinitions, setTripDefinitions] = useState([]);

    useEffect(() => {
        const subscription = TripDefinitionsService.subscribe(trips => setTripDefinitions(trips));
        return () => subscription.unsubscribe();
    }, []);

    const tripDetails = getTripDetails(tripDefinitions);

    return (
        <div className="EditPanel">
            <AppBar position="sticky">
                <Toolbar>
                    <Button color="inherit" onClick={props.onBack}>
                        <NavigateBeforeIcon className="EditPanel-back-btn-icon" /> Display mode
                    </Button>
                </Toolbar>
            </AppBar>
            <div className="EditPanel-main">
                <Paper>
                    <TripDefinitionForm elevation={1} />
                </Paper>
                <div className="EditPanel-trip-details">{tripDetails}</div>
            </div>
        </div>
    );
}

function getTripDetails(tripDefinitions) {
    if (tripDefinitions.length) {
        return (
            <SortableTripContainer
                distance={10}
                onSortEnd={({ oldIndex, newIndex }) => TripDefinitionsService.reorderTrips(oldIndex, newIndex)}
            >
                {tripDefinitions.map((trip, index) => (
                    <SortableTripDefinition key={trip.id} index={index} value={trip} />
                ))}
            </SortableTripContainer>
        );
    }
    return <div className="EditPanel-no-trips">No trips added yet</div>;
}

export default EditPanel;
