const Joi = require("joi");

// Minimum eight characters, at least one letter, one number and one special character
const PW_REGEX = /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}/;

const uuidSchema = Joi.string()
  .guid({
    version: ["uuidv4", "uuidv5"],
  })
  .required();

const getStrValidation = (required = false) =>
  required ? Joi.string().required() : Joi.string();

const getEmailValidation = () =>
  Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "jp"] },
    })
    .required();

const getPasswordValidation = (required = false) =>
  required
    ? Joi.string().pattern(PW_REGEX).required()
    : Joi.string().pattern(PW_REGEX);

const getIntValidation = (required = false) =>
  required ? Joi.number().required() : Joi.number();

const newUserSchema = Joi.object({
  firstName: getStrValidation(true),
  lastName: getStrValidation(true),
  email: getEmailValidation(),
  password: getPasswordValidation(true),
  roleId: getIntValidation(true),
  departmentId: getIntValidation(true),
});

const updateUserSchema = Joi.object({
  email: getEmailValidation(),
  password: getPasswordValidation(),
  roleId: getIntValidation(),
  departmentId: getIntValidation(),
});

const updateSelfSchema = Joi.object({
  firstName: getStrValidation(),
  lastName: getStrValidation(),
  password: getPasswordValidation(),
});

module.exports = {
  uuidSchema,
  newUserSchema,
  updateUserSchema,
  updateSelfSchema,
};
