const Joi = require("joi");

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    phone_number: Joi.string().min(10).required(),
    email: Joi.string().email().min(3).max(255).required(),
    role: Joi.string().required().valid("admin", "teller"),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(user);
}

function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string().email().min(3).max(255).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(user);
}

module.exports = { validateUser, validateLogin };
