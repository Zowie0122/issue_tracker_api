const { Router } = require("express");
const {
  BadRequestGenericError,
  UnauthorizedError,
} = require("../utils/errors");
const { create, update } = require("../controllers/user");
const { getCompanyIdByUserId } = require("../controllers/company");

const router = Router();

// An admin can only update the user belongs to his/her company

// admin add a new user
router.post("/users/add", async (req, res, next) => {
  try {
    /* TODO: validate req.body, ex
      {
          "firstName": "Dale",
          "lastName": "Chunk",
          "email": "dale@jerry.com",
          "password": "pAssword1@",
          "roleId": 2,
          "departmentId": 2
      }
    */

    const companyId = await getCompanyIdByUserId(req.session.user.id);
    res.status(200).json(await create({ ...req.body, companyId }));
  } catch (e) {
    next(e);
  }
});

// admin update an user
router.put("/users/update/:id", async (req, res, next) => {
  try {
    if (!req.params.id) throw BadRequestGenericError();
    /* TODO: validate req.body and id, ex
      {
          "email": "dale@jerry.com",
          "password": "pAssword1@",
          "roleId": 2,
          "departmentId": 2
      }
    */
    // the user's email can't be changed since it is the identifier, and admin can't change user's first name or last name
    // admin is able to change an user's role and department and resetting a user's password
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
router.put("/department", async (req, res, next) => {
  try {
    /* TODO: validate req.body and id, ex
      {
          "name": "new department",
      }
    */

    const adminCompanyId = await getCompanyIdByUserId(req.session.user.id);

    res
      .status(200)
      .json(await update({ ...req.body, companyId: adminCompanyId }));
  } catch (e) {
    next(e);
  }
});

module.exports = router;
