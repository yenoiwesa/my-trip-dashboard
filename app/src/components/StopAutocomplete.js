import React, { useState } from 'react';
import Downshift from 'downshift';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { debounce } from 'lodash';

import './StopAutocomplete.scss';
import Mode from './Mode';

const styles = theme => ({
    container: {
        flexGrow: 1,
        position: 'relative'
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        left: 0,
        right: 0
    }
});

let abortController = new AbortController();
const debouncedFetch = debounce(fetchStops, 200);

function StopAutocomplete(props) {
    const { classes } = props;

    const [suggestions, setSuggestions] = useState([]);

    return (
        <Downshift
            selectedItem={props.value}
            onChange={props.onChange}
            onInputValueChange={inputValue => getSuggestions(inputValue, suggestions => setSuggestions(suggestions))}
            itemToString={item => (item ? item.name : '')}
            defaultHighlightedIndex={0}
        >
            {({ getInputProps, getItemProps, getMenuProps, highlightedIndex, isOpen, selectedItem }) => (
                <div className={classes.container}>
                    {renderInput({
                        required: true,
                        InputProps: getInputProps({
                            placeholder: 'Search a stop'
                        }),
                        label: props.label
                    })}
                    <div {...getMenuProps()}>
                        {isOpen ? (
                            <Paper className={classes.paper} square>
                                {suggestions.map((suggestion, index) =>
                                    renderSuggestion({
                                        suggestion,
                                        index,
                                        itemProps: getItemProps({ item: suggestion }),
                                        highlightedIndex,
                                        selectedItem
                                    })
                                )}
                            </Paper>
                        ) : null}
                    </div>
                </div>
            )}
        </Downshift>
    );
}

function renderInput(inputProps) {
    const { InputProps, ref, ...other } = inputProps;

    return (
        <TextField
            required
            InputProps={{
                inputRef: ref,
                ...InputProps
            }}
            margin="normal"
            fullWidth
            InputLabelProps={{ required: false, shrink: true }}
            {...other}
        />
    );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
    return (
        <MenuItem
            {...itemProps}
            key={suggestion.id}
            selected={highlightedIndex === index}
            component="div"
            style={{
                fontWeight: suggestion === selectedItem ? 500 : 400
            }}
        >
            <div className="StopAutocomplete-stop-name">{suggestion.name}</div>
            {suggestion.modes.map(mode => (
                <Mode mode={mode} key={mode} className="StopAutocomplete-stop-mode" />
            ))}
        </MenuItem>
    );
}

async function getSuggestions(value, cb) {
    // abort previous request
    abortController.abort();

    const inputValue = value.trim().toLowerCase();

    if (inputValue.length > 1) {
        abortController = new AbortController();
        debouncedFetch(inputValue, cb);
    } else {
        cb([]);
    }
}

async function fetchStops(name, cb) {
    try {
        const url = new URL('/api/stops', window.location.href);
        url.searchParams.append('name', name);
        const response = await fetch(url, { signal: abortController.signal });
        cb(await response.json());
    } catch (error) {
        cb([]);
    }
}

export default withStyles(styles)(StopAutocomplete);
