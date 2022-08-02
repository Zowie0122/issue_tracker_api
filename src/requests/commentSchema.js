const Joi = require("joi");

const newCommentSchema = Joi.object({
  contents: Joi.string().required(),
  issueId: Joi.number().required(),
  receiver: Joi.string().guid({
    version: ["uuidv4", "uuidv5"],
  }),
});

module.exports = newCommentSchema;
