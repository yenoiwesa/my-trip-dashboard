import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from '../styles/theme';

const ModalManager = {
    open(renderCb) {
        // create container for the modal to be rendered into
        const renderContainer = document.createElement('div');
        document.body.appendChild(renderContainer);

        // create & render component
        const closeModal = () => this.close(renderContainer);
        const modal = <MuiThemeProvider theme={theme}>{renderCb(closeModal)}</MuiThemeProvider>;
        ReactDOM.render(modal, renderContainer);

        // return unmounting function
        return closeModal;
    },

    close(renderContainer) {
        ReactDOM.unmountComponentAtNode(renderContainer);
        renderContainer.parentNode.removeChild(renderContainer);
    }
};

export default ModalManager;
