const { Router } = require("express");
const router = Router();

const { update } = require("../controllers/user");

router.put("/", update);

module.exports = router;
