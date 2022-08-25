const Joi = require("joi");
const { EM_REGEX, PW_REGEX } = require("../utils/constants");

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .pattern(EM_REGEX)

    .required(),
  password: Joi.string().pattern(PW_REGEX).required(),
});

module.exports = loginSchema;
