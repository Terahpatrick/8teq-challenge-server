const Joi = require("joi");

function validateParcelDispatch(parcel) {
  const schema = Joi.object({
    sender_id: Joi.number().required(),
    recepient_id: Joi.number().required(),
    amount: Joi.number().required(),
    description: Joi.string().required(),
    name: Joi.string().required(),
  });

  return schema.validate(parcel);
}

function validateParcelClose(parcel) {
  const schema = Joi.object({
    sender_id: Joi.number().required(),
    recepient_id: Joi.number().required(),
    status: Joi.string().valid("sent", "received").required(),
    name: Joi.string().required(),
    amount: Joi.number().required(),
    description: Joi.string().required(),
  });

  return schema.validate(parcel);
}

module.exports = { validateParcelClose, validateParcelDispatch };
