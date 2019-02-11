const Router = require('koa-router');
const fetch = require('node-fetch');
const moment = require('moment');

const { TRANSPORT_API_URL, TRANSPORT_TYPES } = require('./constants');
const Config = require('./config');
const { getQueryParam } = require('./apiUtils');

const MAX_RESULTS = 3;

const getTripDetails = async (origin, originOffset, destination, destinationOffset) => {
    const url = new URL(TRANSPORT_API_URL + '/v1/tp/trip');
    const params = {
        outputFormat: 'rapidJSON',
        coordOutputFormat: 'EPSG:4326',
        depArrMacro: 'dep',
        // eslint-disable-next-line camelcase
        type_origin: 'any',
        // eslint-disable-next-line camelcase
        name_origin: origin,
        // eslint-disable-next-line camelcase
        type_destination: 'any',
        // eslint-disable-next-line camelcase
        name_destination: destination,
        calcNumberOfTrips: 3,
        excludedMeans: 'checkbox',
        // exclude bus
        // eslint-disable-next-line camelcase
        exclMOT_5: 1,
        // exclude coach
        // eslint-disable-next-line camelcase
        exclMOT_7: 1,
        // exclude school bus
        // eslint-disable-next-line camelcase
        exclMOT_11: 1,
        TfNSWSF: true,
        version: '10.2.11.46'
    };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const response = await fetch(url, {
        headers: {
            Accept: 'application/json',
            Authorization: `apikey ${Config.api.key}`
        }
    });
    const json = await response.json();
    const results = [];

    if (json.journeys) {
        for (const journey of json.journeys) {
            const trip = { duration: 0 };
            const modes = new Set();
            let stops = 0;

            for (let legIndex = 0; legIndex < journey.legs.length; legIndex++) {
                const leg = journey.legs[legIndex];

                trip.duration += leg.duration;
                modes.add(TRANSPORT_TYPES[leg.transportation.product.class]);

                if (leg.stopSequence) {
                    stops += Math.max(leg.stopSequence.length - 1, 0);
                }

                // use the departure details of the first leg for the whole trip
                if (legIndex === 0) {
                    trip.departure = {
                        id: leg.origin.parent.id,
                        name: leg.origin.parent.disassembledName,
                        planned: leg.origin.departureTimePlanned,
                        estimated: leg.origin.departureTimeEstimated,
                        offset: moment(leg.origin.departureTimeEstimated)
                            .subtract(originOffset, 's')
                            .toISOString()
                    };
                }

                // use the arrival details of the last leg for the whole trip
                if (legIndex === journey.legs.length - 1) {
                    trip.arrival = {
                        id: leg.destination.parent.id,
                        name: leg.destination.parent.disassembledName,
                        planned: leg.destination.arrivalTimePlanned,
                        estimated: leg.destination.arrivalTimeEstimated,
                        offset: moment(leg.destination.arrivalTimeEstimated)
                            .add(destinationOffset, 's')
                            .toISOString()
                    };
                }
            }

            trip.modes = [...modes];

            // if the trip is just by walking, exclude it
            if (trip.modes.length === 1 && trip.modes[0] === 'walk') {
                continue;
            }

            if (stops) {
                trip.stops = stops;
            }

            trip.offsetDuration = trip.duration + originOffset + destinationOffset;

            results.push(trip);

            if (results.length >= MAX_RESULTS) {
                break;
            }
        }
    }

    return results;
};

const trips = new Router();

trips.get('/', async cxt => {
    const origin = getQueryParam(cxt, 'origin');
    const originOffset = getQueryParam(cxt, 'originOffset', parseInt);
    const destination = getQueryParam(cxt, 'destination');
    const destinationOffset = getQueryParam(cxt, 'destinationOffset', parseInt);

    cxt.body = await getTripDetails(origin, originOffset, destination, destinationOffset);
});

module.exports = {
    getTripDetails,
    router: trips
};
