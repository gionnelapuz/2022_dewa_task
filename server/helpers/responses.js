function successResponse(res, data) {
  return res.status(200).json(data);
}

function errorResponse(res, data) {
  return res.status(400).json(data);
}

function validationErrorsResponse(res, errors) {
  res.status(400).json({
    errors: Object.keys(errors).reduce(function (error, key) {
      error[key] = errors[key];
      return error;
    }, {}),
  });
}

module.exports = {
  successResponse,
  errorResponse,
  validationErrorsResponse,
};
