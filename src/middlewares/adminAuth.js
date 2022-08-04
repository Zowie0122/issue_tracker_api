const db = require("../../db");
const { USER_STATUS, PERMISSIONS } = require("../utils/constants");
const { UnauthorizedError, ValidationError } = require("../utils/errors");

const adminAuth = async (req, res, next) => {
  try {
    if (!req.session?.user) throw new UnauthorizedError();

    const { id, email } = req.session.user;
    if (!id || !email) throw new UnauthorizedError();

    const users = await db.query(
      `
    SELECT
        u.id,
        u.email,
        u.status,
        u.role_id       AS rold_id, 
        r.name          AS role
        FROM users u 
        JOIN roles r ON u.role_id = r.id 
        WHERE u.id = $1 AND u.email = $2
    `,
      [id, email]
    );

    if (
      users.length === 0 ||
      users[0].id !== id ||
      users[0].status !== USER_STATUS.active ||
      users[0].role !== PERMISSIONS.admin
    )
      throw new UnauthorizedError();

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = adminAuth;
