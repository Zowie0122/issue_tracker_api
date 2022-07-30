const db = require("../../db");

/**
 * list all the users by companyId
 * @params {number} companyId
 */
const list = (companyId) => {};

/**
 * get user by userId
 * @param {number} userId
 *
 */
const getById = (userId) => {
  db.query(
    `
    SELECT
        id, 
        first_name, 
        last_name, 
        email, 
        company_id, 
        role_id, 
        department_id, 
        status
    FROM users
    LEFT JOIN companies ON companies.id = users.company_id
    LEFT JOIN roles ON roles.id = users.role_id
    LEFT JOIN departments ON departments.id = users.department_id
    WHERE id = $1`,
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
