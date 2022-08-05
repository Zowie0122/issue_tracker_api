const { Router } = require("express");
const { ValidationError, ForbiddenError } = require("../utils/errors");
const { getCompanyIdByUserId } = require("../controllers/company");
const {
  newIssueSchema,
  updateIssueSchema,
  issueIdSchema,
} = require("../requests/issueSchema");
const { list, create, update } = require("../controllers/issue");
const router = Router();

// get issue by queries
router.get("/", async (req, res, next) => {
  try {
    const companyId = await getCompanyIdByUserId(req.session.user.id);
    return res.status(200).json(
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
    const bodyError = newIssueSchema.validate(req.body).error;
    if (bodyError) throw new ValidationError(bodyError.details[0].message);

    const issuer = req.session.user.id;

    const issuerCompanyId = await getCompanyIdByUserId(issuer);
    const receiverCompanyId = await getCompanyIdByUserId(req.body.receiver);
    if (issuerCompanyId !== receiverCompanyId) {
      throw new ForbiddenError()
    }

    return res.status(200).json(await create({ ...req.body, issuer }));
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

    return res.status(200).json(
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
