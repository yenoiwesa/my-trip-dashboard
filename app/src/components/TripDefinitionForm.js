import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AutoSuggest from 'react-autosuggest';

import './TripDefinitionForm.scss';

function TripDefinitionForm(props) {
    const [title, setTitle] = useState();
    const [origin, setOrigin] = useState();
    const [originOffset, setOriginOffset] = useState();
    const [destination, setDestination] = useState();
    const [destinationOffset, setDestinationOffset] = useState();

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Title"
                required
                value={title}
                onChange={event => setTitle(event.target.value)}
                margin="normal"
                InputLabelProps={{ required: false }}
            />
            <TextField
                label="Origin offset"
                required
                type="number"
                value={originOffset}
                onChange={event => setOriginOffset(event.target.value)}
                margin="normal"
                InputProps={{
                    endAdornment: <InputAdornment position="end">min</InputAdornment>
                }}
                InputLabelProps={{ required: false }}
            />
            <TextField
                label="Destination offset"
                required
                type="number"
                value={destinationOffset}
                onChange={event => setDestinationOffset(event.target.value)}
                margin="normal"
                InputProps={{
                    endAdornment: <InputAdornment position="end">min</InputAdornment>
                }}
                InputLabelProps={{ required: false }}
            />
        </form>
    );
}

export default TripDefinitionForm;
