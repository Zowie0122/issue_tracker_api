const { Router } = require("express");
const router = Router();

const {
  listReceived,
  listIssued,
  listByDepartment,
  listByCompany,
  update,
} = require("../controllers/issue");

router.get("/received", (req, res, next) => {});
router.get("/issued", (req, res, next) => {});
router.get("/department", (req, res, next) => {});
router.get("/company", (req, res, next) => {});
router.put("/:id", (req, res, next) => {});

module.exports = router;
