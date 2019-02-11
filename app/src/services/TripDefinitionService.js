import { BehaviorSubject } from 'rxjs';

import TripDefinition from '../model/TripDefinition';

class TripDefinitionService extends BehaviorSubject {
    constructor() {
        super([]);
        this.hydrate();
    }

    addTrip(tripDetails) {
        this.tripDefinitions.push(tripDetails);
        this.persist();
        this.notify();
    }

    removeTrip(tripDefinition) {
        this.tripDefinitions = this.tripDefinitions.filter(tripDef => tripDef.id !== tripDefinition.id);
        this.persist();
        this.notify();
    }

    notify() {
        // must send a new object every time
        this.next(this.tripDefinitions.slice());
    }

    persist() {
        const payload = this.tripDefinitions.map(tripDef => tripDef.toJson());
        localStorage.setItem('TripDefinitions', JSON.stringify(payload));
    }

    hydrate() {
        try {
            const payload = JSON.parse(localStorage.getItem('TripDefinitions'));
            this.tripDefinitions = payload.map(item => TripDefinition.fromJson(item));
        } catch (error) {
            this.tripDefinitions = [];
        }
        this.notify();
    }
}

const singleton = new TripDefinitionService();
export default singleton;
