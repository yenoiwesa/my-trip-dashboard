const Koa = require('koa');
const Router = require('koa-router');
const serveStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');

const APIError = require('./apiError');
const Config = require('./config');
const logger = require('./logger');
// const routes = require('./routes');

const app = new Koa();
const router = new Router();

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
// routes.install(router);
// app.use(router.routes()).use(router.allowedMethods());

const port = Config.server.port;
app.listen(port);
logger.info(`Server listening on port ${port}`);
