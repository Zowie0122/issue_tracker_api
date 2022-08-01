const { Router } = require("express");
const { UnauthorizedError } = require("../utils/errors");
const { list, getById, updateSelf } = require("../controllers/user");
const { getCompanyIdByUserId } = require("../controllers/company");

const router = Router();

router.get("/_test", (req, res, next) => {
  res.send("Login as user");
});

router.get("/", async (req, res, next) => {
  try {
    const companyId = await getCompanyIdByUserId(req.session.user.id);
    res.status(200).json(await list(companyId));
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    res.status(200).json(await getById(userId));
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    // validate req body
    const userId = req.session.user.id;
    if (req.params.id !== userId) {
      throw new UnauthorizedError();
    }

    res.status(200).json(await updateSelf({ ...req.body, id: userId }));
  } catch (e) {
    next(e);
  }
});

module.exports = router;
