const { Router } = require("express");
const { UnauthorizedError } = require("../utils/errors");
const { create, update } = require("../controllers/user");
const { getCompanyIdByUserId } = require("../controllers/company");

const router = Router();

router.get("/_test", (req, res, next) => {
  res.send("Login as admin");
});

router.post("/adduser", async (req, res, next) => {
  try {
    // validate req.body
    const companyId = await getCompanyIdByUserId(req.session.user.id);
    res.status(200).json(await create({ ...req.body, companyId }));
  } catch (e) {
    next(e);
  }
});

router.put("/updateuser/:id", async (req, res, next) => {
  try {
    // validate req.body
    // An admin can only update the user belongs to his/her company, the email can't be changed
    const adminCompanyId = await getCompanyIdByUserId(req.session.user.id);
    const userCompanyId = await getCompanyIdByUserId(req.params.id);

    if (adminCompanyId !== userCompanyId) {
      throw new UnauthorizedError();
    }
    res.status(200).json(await update({ ...req.body, id: req.params.id }));
  } catch (e) {
    next(e);
  }
});

module.exports = router;
