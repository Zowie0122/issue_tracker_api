const Joi = require("joi");

const newDepartmentSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = newDepartmentSchema;
