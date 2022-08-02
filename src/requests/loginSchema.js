const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "jp"] },
    })
    .required(),
  password: Joi.string()
    .pattern(
      // Minimum eight characters, at least one letter, one number and one special character
      /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}/
    )
    .required(),
});

module.exports = loginSchema;
