const { Router } = require("express");
const bcrypt = require("bcryptjs");
const db = require("../../db");
const { USER_STATUS } = require("../utils/constants");
const loginSchema = require("../requests/loginSchema");
const { ValidationError, UnauthorizedError } = require("../utils/errors");

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) throw new ValidationError(error.details[0].message);

    const { email, password } = req.body;
    const users = await db.query(
      "SELECT id, first_name, last_name, email, password, role_id, status FROM users WHERE email = $1",
      [email]
    );

    // Not specify whether an email is registered or not to the client for info safety
    if (users.length === 0 || users[0].status !== USER_STATUS.active)
      throw new UnauthorizedError();

    const matched = bcrypt.compareSync(password, users[0].password);
    if (!matched) {
      throw new UnauthorizedError();
    }

    req.session.user = {
      id: users[0].id,
      email: users[0].email,
    };

    return res.status(200).json({
      auth: {
        user_id: users[0].id,
        role_id: users[0].role_id,
      },
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
