const { Router } = require("express");
const { LogoutError } = require("../utils/errors");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) throw new LogoutError();
        res.json({ msg: "Logout successful" });
      });
    }
  } catch (e) {
    return res.status(e.status).send({ code: e.code, err: e.msg });
  }
});

module.exports = router;
