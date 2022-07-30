const { Router } = require("express");
const router = Router();

const { update } = require("../controllers/user");

router.put("/", (req, res, next) => {});

module.exports = router;
