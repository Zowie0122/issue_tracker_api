const db = require("../../db");
const { NotFoundError } = require("../utils/errors");

/**
 * list all the users by company id
 * @params { number } companyId
 */
const list = (companyId) => {
  const users = db.query(
    `
    SELECT u.id,
        u.first_name,
        u.last_name,
        u.email,
        u.status            AS user_status,
        u.company_id,
        c.name              AS company,
        u.role_id,
        r.name AS role,
        u.department_id,
        d.name              AS department
    FROM users u
        LEFT JOIN companies c ON c.id = u.company_id
        LEFT JOIN roles r ON r.id = u.role_id
        LEFT JOIN departments d ON d.id = u.department_id
    WHERE u.company_id = $1`,
    [companyId]
  );

  return users;
};

/**
 * get user by user's uuid
 * @param { string } userId
 *
 */
const getById = (userId) => {
  const users = db.query(
    `
    SELECT u.id,
        u.first_name,
        u.last_name,
        u.email,
        u.status            AS user_status,
        u.company_id,
        c.name              AS company,
        u.role_id,
        r.name AS role,
        u.department_id,
        d.name              AS department
    FROM users u
        LEFT JOIN companies c ON c.id = u.company_id
        LEFT JOIN roles r ON r.id = u.role_id
        LEFT JOIN departments d ON d.id = u.department_id
    WHERE u.id = $1`,
    [userId]
  );

  if (users.length === 0) {
    throw new NotFoundError();
  }

  const userIssue = db.query(
    `
    SELECT
      id,
      from,
      COUNT(id)
    FROM
      issues
    GROUP BY
      from
    
    
    
    `
  );

  return users[0];
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
