import React from 'react';
import Dialog from '@material-ui/core/Dialog';

import TripDefinitionService from '../services/TripDefinitionService';
import TripDefinitionForm from './TripDefinitionForm';

function EditTripModal(props) {
    const { open, onClose } = props;
    function handleSave(tripData) {
        TripDefinitionService.updateTrip(props.trip.id, tripData);
        onClose();
    }

    return (
        <Dialog open={open} fullWidth={true} maxWidth={'sm'} onClose={onClose} disableBackdropClick={true}>
            <TripDefinitionForm trip={props.trip} editing={true} onSubmit={tripData => handleSave(tripData)} onCancel={onClose} />
        </Dialog>
    );
}

export default EditTripModal;
