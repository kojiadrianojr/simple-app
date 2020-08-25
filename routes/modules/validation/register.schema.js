const Joi = require("@hapi/joi");

module.exports = function (payload) {
  let schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).email().required(),
    username: Joi.string().min(6).alphanum().required(),
    password: Joi.string().required(),
    confirm_password: Joi.ref("password"),
  });

  return schema.validate(payload);
};
