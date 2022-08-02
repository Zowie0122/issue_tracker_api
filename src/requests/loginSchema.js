const Joi = require("joi");
const { PW_REGEX } = require("../utils/constants");

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "jp"] },
    })
    .required(),
  password: Joi.string().pattern(PW_REGEX).required(),
});

module.exports = loginSchema;
