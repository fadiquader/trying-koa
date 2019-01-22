const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-body');
const session = require('koa-session');
const views = require('koa-views');
const mongoose = require('mongoose');
const responseTimer = require('./middleware/responseTimer');
const jsonErrorHandler = require('./middleware/jsonErrorHandler');
const errorHandler = require('./middleware/errorHandler');
const router = require('./middleware/router');
const validator = require('./middleware/validator');
const methodOverride = require('./middleware/method-override');

const initDb = require('./db');

// initialize database
initDb();

const app = new Koa();
app.keys = ['secret key'];

// register middlware
app.use(views(`${__dirname}/views`, {
    extension: 'ejs'
}));

app.use(logger());
app.use(bodyParser());
// app.use(validator());
app.use(session(app));
app.use(methodOverride());
app.use(router.routes());
// app.use(router.allowedMethods());

// register generic error handler middleware
// app.use(errorHandler);

// register json error handler middleware
// app.use(jsonErrorHandler);

// register middleware
// app.use(responseTimer);

// app.use(async ctx => {
//     ctx.body = 'Hello World';
//     // const user = 'anonymous';
//     // ctx.throw(401, 'Access denied to the resource', { user });
// });

const port = process.env.PORT || 1234;

app.listen(port, () => {
    console.log('Server is running on port '+port)
});