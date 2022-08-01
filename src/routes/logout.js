const { Router } = require("express");
const { LogoutError } = require("../utils/errors");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) throw new LogoutError();
        res.status(200).json({ msg: "Logout successfully" });
      });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
