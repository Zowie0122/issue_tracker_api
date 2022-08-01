const { Router } = require("express");
const { getCompanyIdByUserId } = require("../controllers/company");
const { list } = require("../controllers/department");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const companyId = await getCompanyIdByUserId(req.session.user.id);
    res.status(200).json(await list(companyId));
  } catch (e) {
    next(e);
  }
});

module.exports = router;
