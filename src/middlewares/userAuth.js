const { UnauthorizedError, ValidationError } = require("../utils/errors");
const db = require("../../db");
const { USER_STATUS } = require("../utils/constants");

const userAuth = async (req, res, next) => {
  try {
    console.log(req.session.user);
    if (!req.session?.user) throw new UnauthorizedError();

    // switch to joi validation
    const { id, email } = req.session.user;
    if (!id || !email) throw new UnauthorizedError();

    const users = await db.query(
      `
      SELECT
          id,
          email,
          status
          FROM users
          WHERE email = $1
    `,
      [email]
    );

    if (
      users.length === 0 ||
      users[0].id !== id ||
      users[0].status !== USER_STATUS.active
    )
      throw new UnauthorizedError();

    next();
  } catch (e) {
    return res.status(e.status ?? 500).send({ code: e.code, err: e.msg });
  }
};

module.exports = userAuth;
