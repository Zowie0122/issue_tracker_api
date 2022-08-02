const Joi = require("joi");

// TODO: make it DRY
const newIssueSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  receiver: Joi.string()
    .guid({
      version: ["uuidv4", "uuidv5"],
    })
    .required(),
  dueAt: Joi.date().iso().required(),
});

const updateIssueSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  receiver: Joi.string().guid({
    version: ["uuidv4", "uuidv5"],
  }),
  dueAt: Joi.date().iso(),
  status: Joi.number().valid(0, 1),
});

const issueIdSchema = Joi.number().required();

module.exports = { newIssueSchema, updateIssueSchema, issueIdSchema };
