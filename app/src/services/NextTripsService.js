import { BehaviorSubject } from 'rxjs';

import TripDefinitionService from './TripDefinitionService';

const REFRESH_TIME = 1 * 60 * 1000;

class NextTripService extends BehaviorSubject {
    constructor() {
        super([]);

        this.trips = [];
        this.subCount = 0;

        TripDefinitionService.subscribe(tripDefs => (this.trips = tripDefs.map(tripDef => ({ definition: tripDef, schedules: [] }))));
    }

    async fetchNextTrips(trip) {
        try {
            const url = new URL('/api/trips', window.location.href);
            trip.definition.toQueryParams(url);
            const response = await fetch(url);
            trip.schedules = await response.json();
            this.notify();
        } catch (error) {
            trip.schedules = [];
        }
    }

    async fetchAllNextTrips() {
        for (const trip of this.trips) {
            this.fetchNextTrips(trip);
        }
    }

    notify() {
        // must send a new object every time
        this.next(this.trips.slice());
    }

    startUpdating() {
        this.fetchAllNextTrips();
        this.intervalId = setInterval(() => this.fetchAllNextTrips(), REFRESH_TIME);
    }

    stopUpdating() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    subscribe(observer) {
        this.subCount++;
        const subscription = super.subscribe(observer);

        if (this.subCount === 1) {
            this.startUpdating();
        }

        return () => {
            this.subCount--;
            subscription.unsubscribe();

            if (this.subCount <= 0) {
                this.stopUpdating();
            }
        };
    }
}

const singleton = new NextTripService();
export default singleton;
