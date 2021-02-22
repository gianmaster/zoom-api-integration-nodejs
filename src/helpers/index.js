const { validate } = require('express-validation');

function makeValidator(validationSchema, options = {}, joiOptions = {}) {
  return validate(validationSchema, options, joiOptions);
}

module.exports = {
  makeValidator,
};
