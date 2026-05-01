const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // handle invalid MongoDB ObjectId
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  // handle duplicate email error from MongoDB
  if (err.code === 11000) {
    statusCode = 400;
    message = "Email already registered";
  }

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.node_env === "devlopment" ? err.stack : null,
  });
};

module.exports = errorHandler;
