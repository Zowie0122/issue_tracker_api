const { Router } = require("express");
const router = Router();

const { list, create, update } = require("../controllers/comment");

router.get("/", (req, res, next) => {});
router.post("/:id", (req, res, next) => {});
router.put("/:id", (req, res, next) => {});

module.exports = router;
