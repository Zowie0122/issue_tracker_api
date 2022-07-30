const { Router } = require("express");
const bcrypt = require("bcryptjs");
const db = require("../../db");
const { UnauthorizedError, ValidationError } = require("../utils/errors");
const router = Router();

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  // TODO: switch to joi validation
  if (!email || !password) {
    throw new UnauthorizedError();
  }

  try {
    const data = await db.query(
      "SELECT id, email, password FROM users WHERE email = $1",
      [email]
    );

    if (data.rows.length === 0) {
      // Not specify wether if an email is registered or not to the client for safety
      throw new UnauthorizedError();
    }

    const user = data.rows[0];

    const matched = bcrypt.compareSync(password, user.password);
    if (!matched) {
      throw new UnauthorizedError();
    }

    req.session.user = {
      id: user.id,
      email: user.email,
    };

    return res.status(200).json({ user: req.session.user });
  } catch (e) {
    return res.status(e.status).send({ code: e.code, err: e.msg });
  }
});

module.exports = router;
