function logger(request, _, next) {
  // if (request.headers.token) console.log(request.headers.token);
  console.log(`REQUEST method ${request.method}: ${request.originalUrl}`);
  return next();
}

module.exports = logger;
