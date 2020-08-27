const Joi = require("@hapi/joi");

module.exports = function (payload) {
  let schema = Joi.object({
    username: Joi.string().alphanum().min(6).required(),
    password: Joi.string().required(),
  });
  return schema.validate(payload);
};
