const { Router } = require("express");
const router = Router();

const { list, getByID, create, updateSelf } = require("../controllers/user");

router.get("/", list);
router.get("/:id", getByID);
router.post("/:id", create);
router.put("/:id", updateSelf);

module.exports = router;
