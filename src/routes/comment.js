const { Router } = require("express");
const router = Router();

const { list, create, update } = require("../controllers/comment");

router.get("/", list);
router.post("/:id", create);
router.put("/:id", update);

module.exports = router;
