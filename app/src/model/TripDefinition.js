class TripDefinition {
    constructor(title = '', origin = '', originOffset = 0, destination = '', destinationOffset = 0) {
        this.id = new Date().getTime();
        this.title = title;
        this.origin = origin;
        this.originOffset = originOffset;
        this.destination = destination;
        this.destinationOffset = destinationOffset;
    }

    toQueryParams(url) {
        url.searchParams.append('origin', this.origin.id);
        url.searchParams.append('originOffset', this.originOffset * 60);
        url.searchParams.append('destination', this.destination.id);
        url.searchParams.append('destinationOffset', this.destinationOffset * 60);
    }

    update(tripData) {
        Object.assign(this, tripData);
    }

    toObject() {
        return {
            id: this.id,
            title: this.title,
            origin: this.origin,
            originOffset: this.originOffset,
            destination: this.destination,
            destinationOffset: this.destinationOffset
        };
    }

    static fromObject(object) {
        const trip = new TripDefinition(object.title, object.origin, object.originOffset, object.destination, object.destinationOffset);
        trip.id = object.id;
        return trip;
    }
}

export default TripDefinition;
