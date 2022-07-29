const { Router } = require("express");
const router = Router();

const { list } = require("../controllers/department");

router.get("/", list);

module.exports = router;
