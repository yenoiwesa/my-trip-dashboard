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
        this.tripDefinitions.filter(tripDef => tripDef === tripDefinition);
        this.persist();
        this.notify();
    }

    notify() {
        this.next(this.tripDefinitions);
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
