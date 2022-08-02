const { Router } = require("express");
const { BadRequestGenericError, ValidationError } = require("../utils/errors");
const { getCompanyIdByUserId } = require("../controllers/company");
const {
  newIssueSchema,
  updateIssueSchema,
  issueIdSchema,
} = require("../requests/issueSchema");

const router = Router();

const { list, create, update } = require("../controllers/issue");

// get issue by queries
router.get("/", async (req, res, next) => {
  try {
    const companyId = await getCompanyIdByUserId(req.session.user.id);
    res.status(200).json(
      await list({
        ...req.query,
        companyId,
        limit: req.query.limit ? req.query.limit : 20,
        page: req.query.page ? req.query.page : 1,
      })
    );
  } catch (e) {
    next(e);
  }
});

// user add an new issue
router.post("/", async (req, res, next) => {
  try {
    const { error } = newIssueSchema.validate(req.body);
    if (error) throw new ValidationError(error.details[0].message);

    const issuer = req.session.user.id;
    res.status(200).json(await create({ ...req.body, issuer }));
  } catch (e) {
    next(e);
  }
});

// user update an issue that he/she issued
router.put("/:id", async (req, res, next) => {
  try {
    const paramsError = issueIdSchema.validate(req.params.id).error;
    if (paramsError) throw new ValidationError(paramsError.details[0].message);

    const bodyError = updateIssueSchema.validate(req.body).error;
    if (bodyError) throw new ValidationError(bodyError.details[0].message);

    res.status(200).json(
      await update({
        ...req.body,
        id: req.params.id,
        issuer: req.session.user.id,
      })
    );
  } catch (e) {
    next(e);
  }
});

module.exports = router;
