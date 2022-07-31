const db = require("../../db");

/**
 * list all the users by companyId
 * @params {number} companyId
 */
const list = (companyId) => {};

/**
 * get user by user's uuid
 * @param {string} userId
 *
 */
const getById = (userId) => {
  const data = db.query(
    `
    SELECT
        u.id,           AS user_id,
        u.first_name, 
        u.last_name, 
        u.email, 
        u.company_id, 
        u.role_id, 
        u.department_id, 
        u.status        AS user_status,
        c.name          AS company,
        r.name          AS role,
        d.name          AS department
    FROM users u
    LEFT JOIN companies c ON c.id = u.company_id
    LEFT JOIN roles r ON r.id = u.role_id
    LEFT JOIN departments d ON d.id = u.department_id
    WHERE u.id = $1`,
    [userId],
    (err, result) => {
      if (err) throw new Error(err);
      return result;
    }
  );
};

/**
 * create an user, only by admin
 */
const create = () => {};

/**
 * update a user by user himself/herself
 */
const updateSelf = () => {};

/**
 * update a user by admin
 */
const update = () => {};

module.exports = {
  list,
  getById,
  create,
  updateSelf,
  update,
};
