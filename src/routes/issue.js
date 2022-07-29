const { Router } = require("express");
const router = Router();

const {
  listReceived,
  listIssued,
  listByDepartment,
  listByCompany,
  update,
} = require("../controllers/issue");

router.get("/received", listReceived);
router.get("/issued", listIssued);
router.get("/department", listByDepartment);
router.get("/company", listByCompany);
router.put("/:id", update);

module.exports = router;
