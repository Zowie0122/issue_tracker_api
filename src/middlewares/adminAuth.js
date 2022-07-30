const { UnauthorizedError, ValidationError } = require("../utils/errors");
const db = require("../../db");
const session = require("express-session");

const adminAuth = async (req, res, next) => {
  try {
    if (!req.session?.user) throw new UnauthorizedError();

    const { id, email } = req.session.user;
    if (!id || !email) throw new UnauthorizedError();

    const data = await db.query(
      `
    SELECT
        u.id            AS user_id,
        u.email, 
        u.role_id, 
        r.name          AS role
        FROM users u 
        JOIN roles r ON u.role_id = r.id 
        WHERE u.email = $1
    `,
      [email]
    );

    if (
      data.rows.length === 0 ||
      data.rows[0].user_id !== id ||
      data.rows[0].role !== "Admin"
    )
      throw new UnauthorizedError();

    next();
  } catch (e) {
    return res.status(e.status).send({ code: e.code, err: e.msg });
  }
};

module.exports = adminAuth;