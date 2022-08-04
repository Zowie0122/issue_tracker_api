const bcrypt = require("bcryptjs");
const db = require("../../db");
const { DuplicationError, NotFoundError } = require("../utils/errors");

/**
 * list all the users of a company by company id
 * @params {number} companyId
 * @returns array
 */
const list = async (companyId) => {
  const users = db.query(
    `
    SELECT 
        id,
        first_name,
        last_name,
        email,
        company_id,
        role_id,
        department_id,
        created_at,
        status
    FROM users u
    WHERE company_id = $1`,
    [companyId]
  );

  return users;
};

/**
 * get a user by user's id
 * @param {string} userId
 * @param {boolean} hidePW
 * @returns object
 */
const getById = async (userId, hidePW = true) => {
  const users = await db.query(
    `
    SELECT *
    FROM users
    WHERE id = $1`,
    [userId]
  );

  if (users.length === 0) {
    throw new NotFoundError();
  }

  if (hidePW) delete users[0].password

  return users[0];
};

/**
 * get a user by user's email
 * @param {string} email
 * @returns object
 */
const getByEmail = async (email) => {
  const users = await db.query(
    `
    SELECT *
    FROM users
    WHERE email = $1`,
    [email]
  );

  if (users.length === 0) {
    throw new NotFoundError();
  }

  return users[0];
};

/**
 * create an new user, only by admin
 * @param {object} userInfo
 * @returns object || undefined
 */
const create = async (userInfo) => {
  const {
    firstName,
    lastName,
    email,
    password,
    companyId,
    roleId,
    departmentId,
  } = userInfo;

  hashedPassword = bcrypt.hashSync(password);

  const newUser = await db.query(
    `
    INSERT INTO users (
        first_name,
        last_name,
        email,
        password,
        company_id,
        role_id,
        department_id
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT DO NOTHING
    RETURNING *`,
    [
      firstName,
      lastName,
      email,
      hashedPassword,
      companyId,
      roleId,
      departmentId,
    ]
  );

  if (newUser.length === 0) {
    throw new DuplicationError();
  }

  delete newUser[0].password
  return newUser[0];
};

/**
 * update a user by admin
 * @param {object} userInfo
 * @returns object || undefined
 */
const update = async (userInfo) => {
  const { password, departmentId, roleId, status, id } = userInfo;

  let hashedPassword;
  if (password) {
    // use the default salt as 10
    hashedPassword = bcrypt.hashSync(password);
  }

  const updatedUser = await db.query(
    `
      UPDATE users
      SET
          password = COALESCE($1, password), 
          department_id = COALESCE($2, department_id), 
          role_id = COALESCE($3, role_id), 
          status = COALESCE($4, status)
      WHERE id = $5
      RETURNING *`,
    [hashedPassword, departmentId, roleId, status, id]
  );

  delete updatedUser[0].password
  return updatedUser[0];
};

/**
 * update a user by user him/her self
 * @param {object} userInfo
 * @returns object || undefined
 */
const updateSelf = async (userInfo) => {
  const { id, firstName, lastName, newPassword } = userInfo;

  let hashedPassword;
  // use the default salt as 10
  if (newPassword) hashedPassword = bcrypt.hashSync(newPassword);

  const user = await db.query(
    `
      UPDATE users
      SET 
          first_name = COALESCE($1, first_name), 
          last_name = COALESCE($2, last_name), 
          password = COALESCE($3, password)
      WHERE id = $4
      RETURNING *`,
    [firstName, lastName, hashedPassword, id]
  );

  delete user[0].password
  return user[0];
};

module.exports = {
  list,
  getById,
  getByEmail,
  create,
  updateSelf,
  update,
};
