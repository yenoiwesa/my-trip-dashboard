const Router = require('koa-router');
const fetch = require('node-fetch');

const { TRANSPORT_API_URL, TRANSPORT_TYPES } = require('./constants');
const Config = require('./config');
const { getQueryParam } = require('./apiUtils');

const MAX_RESULTS = 5;

const ALLOWED_MODES = new Set(['train', 'light rail', 'bus', 'ferry']);

const posts = new Router();

const getStops = async name => {
    const url = new URL(TRANSPORT_API_URL + '/v1/tp/stop_finder');
    const params = {
        outputFormat: 'rapidJSON',
        // eslint-disable-next-line camelcase
        type_sf: 'stop',
        // eslint-disable-next-line camelcase
        name_sf: name,
        coordOutputFormat: 'EPSG:4326',
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

    if (json.locations) {
        for (const location of json.locations) {
            // parse and filter modes
            const modes = [];
            (location.productClasses || []).forEach(productClass => {
                const mode = TRANSPORT_TYPES[productClass];
                if (ALLOWED_MODES.has(mode)) {
                    modes.push(mode);
                }
            });

            if (!modes.length) {
                continue;
            }

            const stop = {
                id: location.id,
                name: location.disassembledName,
                modes: modes
            };

            // try to get better name
            if (location.assignedStops && location.assignedStops.length) {
                const assignedStopName = location.assignedStops[0].name;
                stop.name = assignedStopName || stop.name;
            }

            // extract locality
            if (location.parent && location.parent.type === 'locality') {
                stop.locality = location.parent.name;
            }

            results.push(stop);

            if (results.length >= MAX_RESULTS) {
                break;
            }
        }
    }

    return results;
};

posts.get('/', async cxt => {
    const name = getQueryParam(cxt, 'name');
    cxt.body = await getStops(name);
});

module.exports = {
    getStops,
    router: posts
};
