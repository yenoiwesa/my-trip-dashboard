import { BehaviorSubject } from 'rxjs';

import TripDefinition from '../model/TripDefinition';

class TripDefinitionService extends BehaviorSubject {
    constructor() {
        super([]);
        this.hydrate();
    }

    addTrip(tripDetails) {
        this.tripDefinitions.push(tripDetails);
        this.save();
    }

    removeTrip(tripDefinition) {
        this.tripDefinitions = this.tripDefinitions.filter(tripDef => tripDef.id !== tripDefinition.id);
        this.save();
    }

    updateTrip(tripId, tripData) {
        const trip = this.tripDefinitions.find(trip => trip.id === tripId);
        if (trip) {
            trip.update(tripData);
            this.save();
        }
    }

    reorderTrips(fromIndex, toIndex) {
        // taken from arra-move npm project
        this.tripDefinitions.splice(
            toIndex < 0 ? this.tripDefinitions.length + toIndex : toIndex,
            0,
            this.tripDefinitions.splice(fromIndex, 1)[0]
        );
        this.save();
    }

    notify() {
        // must send a new object every time
        this.next(this.tripDefinitions.slice());
    }

    save() {
        const payload = this.tripDefinitions.map(tripDef => tripDef.toObject());
        localStorage.setItem('TripDefinitions', JSON.stringify(payload));
        this.notify();
    }

    hydrate() {
        try {
            const payload = JSON.parse(localStorage.getItem('TripDefinitions'));
            this.tripDefinitions = payload.map(item => TripDefinition.fromObject(item));
        } catch (error) {
            this.tripDefinitions = [];
        }
        this.notify();
    }
}

const singleton = new TripDefinitionService();
export default singleton;
