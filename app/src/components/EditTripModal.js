import React from 'react';
import Dialog from '@material-ui/core/Dialog';

import TripDefinitionService from '../services/TripDefinitionService';
import TripDefinitionForm from './TripDefinitionForm';

function EditTripModal(props) {
    const { close } = props;
    function handleSave(tripData) {
        TripDefinitionService.updateTrip(props.trip.id, tripData);
        close();
    }

    return (
        <Dialog open={true} fullWidth={true} maxWidth={'sm'} onClose={close} disableBackdropClick={true}>
            <TripDefinitionForm trip={props.trip} editing={true} onSubmit={tripData => handleSave(tripData)} onCancel={close} />
        </Dialog>
    );
}

export default EditTripModal;
