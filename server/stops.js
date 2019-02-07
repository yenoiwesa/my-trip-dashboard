const Router = require('koa-router');
const fetch = require('node-fetch');

const { TRANSPORT_API_URL, TRANSPORT_TYPES } = require('./constants');
const Config = require('./config');
const { getQueryParam } = require('./apiUtils');

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
            const stop = {
                id: location.id,
                name: location.disassembledName,
                modes: (location.productClasses || []).map(productClass => TRANSPORT_TYPES[productClass])
            };

            results.push(stop);
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
