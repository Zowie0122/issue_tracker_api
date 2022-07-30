const { Router } = require("express");
const router = Router();

const { list, getByID, create, updateSelf } = require("../controllers/user");

router.get("/", (req, res, next) => {});
router.get("/:id", (req, res, next) => {});
router.post("/:id", (req, res, next) => {});
router.put("/:id", (req, res, next) => {});

module.exports = router;
