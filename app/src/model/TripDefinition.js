class TripDefinition {
    constructor(title, origin, originOffset, destination, destinationOffset) {
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

    toJson() {
        return {
            id: this.id,
            title: this.title,
            origin: this.origin,
            originOffset: this.originOffset,
            destination: this.destination,
            destinationOffset: this.destinationOffset
        };
    }

    static fromJson(json) {
        const trip = new TripDefinition(json.title, json.origin, json.originOffset, json.destination, json.destinationOffset);
        trip.id = json.id;
        return trip;
    }
}

export default TripDefinition;
