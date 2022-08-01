const { Router } = require("express");
const {
  BadRequestGenericError,
  UnauthorizedError,
} = require("../utils/errors");
const { getDepartmentIdByUserId } = require("../controllers/department");

const router = Router();

const {
  getById,
  listReceived,
  listIssued,
  listByDepartment,
  create,
  update,
} = require("../controllers/issue");

// TODO: would it be useful to list all the issues that either he/she issued or received ?

// get an issue by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params.id;
    res.status(200).json(await getById(id));
  } catch (e) {
    next(e);
  }
});

// get issues that the current user received
router.get("/received", async (req, res, next) => {
  try {
    const receiver = req.session.user.id;
    res.status(200).json(await listReceived(receiver));
  } catch (e) {
    next(e);
  }
});

// get issues that the current user issued
router.get("/issued", async (req, res, next) => {
  try {
    const issuer = req.session.user.id;
    res.status(200).json(await listIssued(issuer));
  } catch (e) {
    next(e);
  }
});

// get the issues of the current user's department
router.get("/department", async (req, res, next) => {
  try {
    const userDepartmentId = await getDepartmentIdByUserId(req.session.user.id);
    res.status(200).json(await listByDepartment(userDepartmentId));
  } catch (e) {
    next(e);
  }
});

// user add an new issue
router.post("/", async (req, res, next) => {
  try {
    // TODO: validate the req.body
    const issuer = req.session.user.id;
    res.status(200).json(await create({ ...req.body, issuer }));
  } catch (e) {
    next(e);
  }
});

// user update an issue that he/she issued
router.put("/:id", async (req, res, next) => {
  try {
    // only issuer could update the issue
    if (req.body.issuer !== req.session.user.id) {
      throw new UnauthorizedError();
    }

    if (!req.params.id) throw BadRequestGenericError();
    // TODO: validate the req.body

    res.status(200).json(await update({ ...req.body, id: req.params.id }));
  } catch (e) {
    next(e);
  }
});

module.exports = router;
