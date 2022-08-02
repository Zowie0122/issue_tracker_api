const { Router } = require("express");
const { BadRequestGenericError } = require("../utils/errors");
const { getCompanyIdByUserId } = require("../controllers/company");

const router = Router();

const { list, create, update } = require("../controllers/issue");

// get an issue by id
router.get("/", async (req, res, next) => {
  try {
    const companyId = await getCompanyIdByUserId(req.session.user.id);
    res.status(200).json(await list({ ...req.query, companyId }));
  } catch (e) {
    next(e);
  }
});

// user add an new issue
router.post("/", async (req, res, next) => {
  try {
    // TODO: validate the req.body
    const issuer = req.session.user.id;
    res.status(200).json(await create({ ...req.body, issuer }));
  } catch (e) {
    next(e);
  }
});

// user update an issue that he/she issued
router.put("/:id", async (req, res, next) => {
  try {
    if (!req.params.id) throw BadRequestGenericError();
    // TODO: validate the req.body

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
