const { Router } = require("express");
const { ValidationError, UnauthorizedError } = require("../utils/errors");
const {
  newUserSchema,
  updateUserSchema,
  uuidSchema,
} = require("../requests/userSchema");
const newDepartmentSchema = require("../requests/departmentSchema");
const { create, update } = require("../controllers/user");
const { getCompanyIdByUserId } = require("../controllers/company");
const { createDepartment } = require("../controllers/department");

const router = Router();

// An admin can only update the user belongs to his/her company

// admin add a new user
router.post("/users/add", async (req, res, next) => {
  try {
    const { error } = newUserSchema.validate(req.params.id);
    if (error) throw new ValidationError(error.details[0].message);

    const companyId = await getCompanyIdByUserId(req.session.user.id);
    res.status(200).json(await create({ ...req.body, companyId }));
  } catch (e) {
    next(e);
  }
});

// admin update a user
router.put("/users/update/:id", async (req, res, next) => {
  try {
    const paramsError = uuidSchema.validate(req.params.id).error;
    if (paramsError) throw new ValidationError(paramsError.details[0].message);

    const bodyError = updateUserSchema.validate(req.body).error;
    if (bodyError) throw new ValidationError(bodyError.details[0].message);

    // the user's email can't be changed since it is the identifier, and admin can't change user's first name or last name
    // admin is able to change a user's role and department and reset a user's password
    const adminCompanyId = await getCompanyIdByUserId(req.session.user.id);
    const userCompanyId = await getCompanyIdByUserId(req.params.id);

    if (adminCompanyId !== userCompanyId) {
      throw new UnauthorizedError();
    }
    res.status(200).json(await update({ ...req.body, id: req.params.id }));
  } catch (e) {
    next(e);
  }
});

// admin add a new department
router.post("/departments", async (req, res, next) => {
  try {
    const { error } = newDepartmentSchema.validate(req.body);
    if (error) throw new ValidationError(error.details[0].message);

    const adminCompanyId = await getCompanyIdByUserId(req.session.user.id);

    res
      .status(200)
      .json(await createDepartment({ ...req.body, companyId: adminCompanyId }));
  } catch (e) {
    next(e);
  }
});

module.exports = router;
