const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { getByEmail } = require("../controllers/user")
const { USER_STATUS } = require("../utils/constants");
const loginSchema = require("../requests/loginSchema");
const { ValidationError, UnauthorizedError, ForbiddenError } = require("../utils/errors");

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) throw new ValidationError(error.details[0].message);

    const user = await getByEmail(req.body.email);

    const {
      id,
      email,
      password,
      status,
    } = user;

    if (status !== USER_STATUS.active) {
      throw new ForbiddenError();
    }

    const matched = bcrypt.compareSync(req.body.password, password);
    if (!matched) {
      throw new UnauthorizedError();
    }

    req.session.user = {
      id,
      email,
    };

    return res.status(200).redirect('/issues/received');
  } catch (e) {
    next(e);
  }
});

module.exports = router;
