const { UnauthorizedError, ValidationError } = require("../utils/errors");
const db = require("../../db");
const session = require("express-session");

const userAuth = async (req, res, next) => {
  try {
    console.log(req.session.user);
    if (!req.session?.user) throw new UnauthorizedError();

    const { id, email } = req.session.user;
    if (!id || !email) throw new UnauthorizedError();

    const data = await db.query(
      `
    SELECT
        id,
        email
        FROM users
        WHERE email = $1
    `,
      [email]
    );

    if (data.rows.length === 0 || data.rows[0].id !== id)
      throw new UnauthorizedError();

    next();
  } catch (e) {
    return res.status(e.status).send({ code: e.code, err: e.msg });
  }
};

module.exports = userAuth;
