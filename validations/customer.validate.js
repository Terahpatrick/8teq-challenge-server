const Joi = require("joi");

function validateCustomer(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    phone_number: Joi.string().min(10).required(),
    email: Joi.string().email().min(3).max(255).required(),
    teller_id: Joi.number().required(),
    address: Joi.string().required(),
  });

  return schema.validate(user);
}

module.exports = { validateCustomer };
