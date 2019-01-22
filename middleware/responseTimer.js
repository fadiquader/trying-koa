const responseTimer = async (ctx, next) => {
    const { method, path } = ctx.request;
    const start = Date.now();
    await next();
    const timeTaken = (Date.now() - start) / 1000; // divide by 1000 to get time in seconds
    console.log(`${method} request to ${path} took ${timeTaken}s`);
};

module.exports = responseTimer;