import './App.scss';

import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import { first } from 'rxjs/operators';

import theme from './styles/theme';
import EditPanel from './components/EditPanel';
import DisplayPanel from './components/DisplayPanel';
import TripDefinitionsService from './services/TripDefinitionService';

const generateClassName = createGenerateClassName();
const jss = create({
    ...jssPreset(),
    // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
    insertionPoint: document.getElementById('jss-insertion-point')
});

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false
        };
    }

    componentDidMount() {
        // automatically go in editing mode if there is no trip defined
        TripDefinitionsService.pipe(first()).subscribe(trips => this.setState({ editing: !trips.length }));
    }

    render() {
        return (
            <JssProvider jss={jss} generateClassName={generateClassName}>
                <MuiThemeProvider theme={theme}>
                    <div className="App">
                        {this.state.editing ? (
                            <EditPanel onBack={() => this.setState({ editing: false })} />
                        ) : (
                            <DisplayPanel onEdit={() => this.setState({ editing: true })} />
                        )}
                    </div>
                </MuiThemeProvider>
            </JssProvider>
        );
    }
}

export default App;
