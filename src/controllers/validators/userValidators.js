const { Joi } = require('express-validation');

const createZoomUserValidationSchema = {
  body: Joi.object({
    action: Joi.string().required(),
    user_info: Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      type: Joi.number().equal(1),
    }),
  }),
};

const createUserValidationSchema = {
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
};

const updateUserValidationSchema = {
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }),
};

module.exports = {
  createZoomUserValidationSchema,
  createUserValidationSchema,
  updateUserValidationSchema,
};
