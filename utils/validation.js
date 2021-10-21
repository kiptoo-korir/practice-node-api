const { validationResult } = require("express-validator");

function validationHandler(request, response, next) {
  const errors = validationResult(request);
  if (errors.isEmpty()) {
    return next();
  }

  return response.status(422).json({ errors: errors.array() });
}

module.exports = {
  validationHandler,
};
