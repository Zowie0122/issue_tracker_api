const { Router } = require("express");
const { LogoutError } = require("../utils/errors");

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) throw new LogoutError();
        return res.status(200).json({});
      });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
