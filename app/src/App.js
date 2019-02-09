import './App.scss';

import React, { Component } from 'react';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: {
            main: '#2196f3'
        }
    }
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    <IconButton color="primary" aria-label="Settings">
                        <MoreHoriz />
                    </IconButton>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
