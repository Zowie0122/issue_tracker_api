const { Router } = require("express");
const router = Router();

const { list } = require("../controllers/department");

router.get("/", (req, res, next) => {});

module.exports = router;
