exports.notFoundError = (req, res, next) => {
  res.status(404).json({
    error: {
      code: 400,
      message: '404 - not found',
    },
  });
  next();
};

