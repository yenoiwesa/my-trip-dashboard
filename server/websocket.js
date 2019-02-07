const io = require('socket.io')();

const logger = require('./logger');
const { getTripDetails } = require('./trips');

io.on('connection', socket => {
    logger.info('Client has connected to web socket');

    // receive trip details
    socket.on('trip-details', (id, msg) => {
        logger.info('Trip details received %s %s', id, msg);
    });

    // request trip details
    socket.emit('request-trip-details');
});

module.exports = io;
