const notFound = (req, res, next) => {
  const error = new error(`Route Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = notFound;
