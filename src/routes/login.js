const { Router } = require("express");
const bcrypt = require("bcryptjs");
const db = require("../../db");
const { UnauthorizedError } = require("../utils/errors");
const { USER_STATUS } = require("../utils/constants");

const router = Router();

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  // TODO: switch to joi validation
  if (!email || !password) {
    throw new UnauthorizedError();
  }

  try {
    const users = await db.query(
      "SELECT id, email, password, status FROM users WHERE email = $1",
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

    return res.status(200).json({ user: req.session.user });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
