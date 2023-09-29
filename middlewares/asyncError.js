exports.asyncError = (err, req, res, next) => {
  console.log('AsyncError: ', err.message);
  res.status(500).json({
    error: {
      code: 500,
      message: 'Server error.',
    },
  });
  next();
};

