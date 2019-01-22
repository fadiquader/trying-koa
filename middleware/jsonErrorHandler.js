// define json request error handler
const jsonErrorHandler = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        const isJson = ctx.get('Accept') === 'application/json';
        if (isJson) {
            ctx.status = err.status || 500;
            ctx.body = {
                error: `An error just occurred`
            }
        } else {
            throw err;
        }
    }
};

module.exports = jsonErrorHandler;