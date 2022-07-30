const { Router } = require("express");
const router = Router();

const { list, getByID, create, updateSelf } = require("../controllers/user");

router.get("/_test", (req, res, next) => {
  res.send("Login as user");
});

router.get("/", (req, res, next) => {
  console.log(req.session);
});
router.get("/:id", (req, res, next) => {});
router.post("/:id", (req, res, next) => {});
router.put("/:id", (req, res, next) => {});

module.exports = router;
