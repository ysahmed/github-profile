exports.asyncError = (err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({
    message: 'error',
  });
  next();
};

