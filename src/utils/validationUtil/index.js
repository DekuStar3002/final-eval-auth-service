const Joi = require('joi');

const bodySchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
});

const headerSchema = Joi.object({
  authorization: Joi.string().required()
});

module.exports = { bodySchema, headerSchema };