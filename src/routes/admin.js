const { Router } = require("express");
const router = Router();

const { update } = require("../controllers/user");

router.get("/_test", (req, res, next) => {
  res.send("Login as admin");
});

router.put("/", (req, res, next) => {});

module.exports = router;
