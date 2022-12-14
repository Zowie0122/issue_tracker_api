const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { list, getById, updateSelf } = require("../controllers/user");
const { getCompanyIdByUserId } = require("../controllers/company");
const { uuidSchema, updateSelfSchema } = require("../requests/userSchema");
const { UnauthorizedError, ForbiddenError } = require("../utils/errors");

const router = Router();

// get user(s) by query, if no query, return all the users in the same company
router.get("/", async (req, res, next) => {
  try {
    // if a user retrives the info of him/her self
    if (Boolean(req.query.self)) {
      return res.status(200).json(await getById(req.session.user.id));
    }

    const currentUserCompanyId = await getCompanyIdByUserId(
      req.session.user.id
    );

    if (req.query.id) {
      const { error } = uuidSchema.validate(req.query.id);
      if (error) throw new ValidationError();

      const targetUser = await getById(req.query.id);

      // if a user retrives another company's user
      if (targetUser.company_id !== currentUserCompanyId) {
        throw new UnauthorizedError();
      }

      return res.status(200).json(targetUser);
    }
    return res.status(200).json(await list(currentUserCompanyId));
  } catch (e) {
    next(e);
  }
});

// a user update him/her self
router.put("/:id", async (req, res, next) => {
  try {
    const paramsError = uuidSchema.validate(req.params.id).error;
    if (paramsError) throw new ValidationError(paramsError.details[0].message);

    if (req.params.id !== req.session.user.id) {
      throw new UnauthorizedError();
    }

    const bodyError = updateSelfSchema.validate(req.body).error;
    if (bodyError) throw new ValidationError(bodyError.details[0].message);

    const { currentPassword, newPassword } = req.body
    if (newPassword) {
      // check if the user gives the right current password
      const { password } = await getById(req.session.user.id, false)

      const matched = bcrypt.compareSync(currentPassword, password);
      if (!matched) {
        throw new ForbiddenError();
      }
    }

    return res
      .status(200)
      .json(await updateSelf({ ...req.body, id: req.session.user.id }));
  } catch (e) {
    next(e);
  }
});

module.exports = router;
