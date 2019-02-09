const logger = require('./logger');

// read API key from environment variables
const apiKey = process.env.TRANSPORT_API_KEY;
if (!apiKey) {
    logger.error("'TRANSPORT_API_KEY' environment variable must be defined");
    logger.info('e.g. TRANSPORT_API_KEY=<key> npm run start');
    process.exit();
}

module.exports = {
    server: {
        port: 8080
    },
    api: {
        key: apiKey
    }
};
