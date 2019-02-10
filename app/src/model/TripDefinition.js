class TripDefinition {
    constructor(title, origin, originOffset, destination, destinationOffset) {
        this.title = title;
        this.origin = origin;
        this.originOffset = originOffset;
        this.destination = destination;
        this.destinationOffset = destinationOffset;
    }

    toQueryParams(url) {
        url.searchParams.append('origin', this.origin);
        url.searchParams.append('originOffset', this.originOffset);
        url.searchParams.append('destination', this.destination);
        url.searchParams.append('destinationOffset', this.destinationOffset);
    }

    toJson() {
        return {
            title: this.title,
            origin: this.origin,
            originOffset: this.originOffset,
            destination: this.destination,
            destinationOffset: this.destinationOffset
        };
    }

    static fromJson(json) {
        return new TripDefinition(json.title, json.origin, json.originOffset, json.destination, json.destinationOffset);
    }
}

export default TripDefinition;
