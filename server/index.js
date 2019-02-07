const Koa = require('koa');
const Router = require('koa-router');
const serveStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger-winston');

const APIError = require('./apiError');
const Config = require('./config');
const logger = require('./logger');
const stops = require('./stops');
const trips = require('./trips');
const websocket = require('./websocket');

const app = new Koa();

// logging
app.use(koaLogger(logger));

// static files
app.use(serveStatic('./build'));

// error handling
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = { error: { message: err.message, status: ctx.status } };
        ctx.app.emit('error', err, ctx);
    }
});

app.on('error', (err, _ctx_) => {
    if (err instanceof APIError) {
        logger.info(`API Error: ${err.status} - ${err.message}`);
    } else {
        logger.error(err);
    }
});

// middleware
app.use(bodyParser());

// routes
const router = new Router({ prefix: '/api' });
router.use('/stops', stops.router.routes(), stops.router.allowedMethods());
router.use('/trips', trips.router.routes(), trips.router.allowedMethods());
app.use(router.routes());

let port = Config.server.port;
app.listen(port);
logger.info(`HTTP server listening on port ${port}`);

port = Config.server.wsPort;
websocket.listen(port);
logger.info(`WebSocket server listening on port ${port}`);