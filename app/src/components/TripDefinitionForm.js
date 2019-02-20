import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import TrainIcon from '@material-ui/icons/Train';

import './TripDefinitionForm.scss';
import StopAutocomplete from './StopAutocomplete';

function TripDefinitionForm(props) {
    const { trip, editing, onSubmit, onCancel } = props;
    const [prevTrip, setPrevTrip] = useState(null);
    const [title, setTitle] = useState();
    const [origin, setOrigin] = useState();
    const [originOffset, setOriginOffset] = useState();
    const [destination, setDestination] = useState();
    const [destinationOffset, setDestinationOffset] = useState();

    if (trip !== prevTrip) {
        // trip prop changed, reset from the new passed trip
        setTitle(trip.title);
        setOrigin(trip.origin);
        setOriginOffset(trip.originOffset);
        setDestination(trip.destination);
        setDestinationOffset(trip.destinationOffset);
        setPrevTrip(trip);
    }

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit({ title, origin, originOffset, destination, destinationOffset });
    }

    return (
        <form className="TripDefinitionForm" onSubmit={handleSubmit}>
            <h2 className="TripDefinitionForm-heading">
                <TrainIcon /> {editing ? 'Edit trip details' : 'New trip details'}
            </h2>

            <TextField
                label="Title"
                required
                value={title}
                onChange={event => setTitle(event.target.value)}
                InputLabelProps={{ required: false, shrink: true }}
                fullWidth
                margin="normal"
            />

            <StopAutocomplete required label="Origin" value={origin} onChange={stop => setOrigin(stop)} />

            <TextField
                label="Travel time to origin"
                required
                type="number"
                value={originOffset}
                onChange={event => setOriginOffset(event.target.value)}
                InputProps={{
                    endAdornment: <InputAdornment position="end">min</InputAdornment>
                }}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                inputProps={{
                    min: '0',
                    step: '0.5'
                }}
                InputLabelProps={{ required: false, shrink: true }}
                fullWidth
                margin="normal"
            />

            <StopAutocomplete value={destination} label="Destination" onChange={stop => setDestination(stop)} />

            <TextField
                label="Travel time from destination"
                required
                type="number"
                value={destinationOffset}
                onChange={event => setDestinationOffset(event.target.value)}
                InputProps={{
                    endAdornment: <InputAdornment position="end">min</InputAdornment>
                }}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                inputProps={{
                    min: '0',
                    step: '0.5'
                }}
                InputLabelProps={{ required: false, shrink: true }}
                fullWidth
                margin="normal"
            />

            <div className="TripDefinitionForm-actions">
                {editing ? (
                    <Button className="TripDefinitionForm-cancel" onClick={onCancel}>
                        Cancel
                    </Button>
                ) : null}
                <Button className="TripDefinitionForm-submit" type="submit" color="primary">
                    {editing ? 'Save' : 'Add trip'}
                </Button>
            </div>
        </form>
    );
}

export default TripDefinitionForm;
