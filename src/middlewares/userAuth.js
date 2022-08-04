const db = require("../../db");
const { USER_STATUS } = require("../utils/constants");
const { UnauthorizedError } = require("../utils/errors");

const userAuth = async (req, res, next) => {
  try {
    if (!req.session?.user) throw new UnauthorizedError();

    const { id, email } = req.session.user;
    if (!id || !email) throw new UnauthorizedError();

    const users = await db.query(
      `
      SELECT
          id,
          email,
          status
          FROM users
          WHERE id = $1 AND email = $2
    `,
      [id, email]
    );

    if (
      users.length === 0 ||
      users[0].id !== id ||
      users[0].status !== USER_STATUS.active
    )
      throw new UnauthorizedError();

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = userAuth;
