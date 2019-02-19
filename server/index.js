const Koa = require('koa');
const Router = require('koa-router');
const serveStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger-winston');
const parseArgs = require('minimist');

const APIError = require('./apiError');
const Config = require('./config');
const logger = require('./logger');
const stops = require('./stops');
const trips = require('./trips');

// read command line arguments
const argv = parseArgs(process.argv.slice(2), { default: { port: Config.server.port } });
const port = argv.port;

const app = new Koa();

// logging
app.use(koaLogger(logger));

// static files
app.use(serveStatic('./app/build'));

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

app.listen(port);
logger.info(`Server listening on port ${port}`);
