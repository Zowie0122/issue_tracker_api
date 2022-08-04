const bcrypt = require("bcryptjs");
const db = require("../../db");
const { DuplicationError, NotFoundError } = require("../utils/errors");

/**
 * list all the users of a company by company id
 * @params {number} companyId
 * @returns array
 */
const list = async (companyId) => {
  // TODO: may not need the company, department or role name.
  const users = db.query(
    `
    SELECT u.id,
        u.first_name,
        u.last_name,
        u.email,
        u.company_id,
        c.name              AS company,
        u.role_id,
        r.name AS role,
        u.department_id,
        d.name              AS department,
        u.status
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
 * get a user by user's id
 * @param {string} userId
 * @returns object
 */
const getById = async (userId) => {
  const users = await db.query(
    `
    SELECT u.id,
        u.first_name,
        u.last_name,
        u.email,
        u.status,
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

  const issuedCount = await db.query(
    `
    SELECT COUNT(*)  AS count
    FROM issues
    WHERE issues.issuer = $1`,
    [userId]
  );

  const receivedCount = await db.query(
    `
    SELECT COUNT(*)  AS count
    FROM issues
    WHERE issues.receiver = $1`,
    [userId]
  );

  return {
    ...users[0],
    issued: Number(issuedCount[0].count),
    received: Number(receivedCount[0].count),
  };
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
    RETURNING id, first_name, last_name, email, company_id, role_id, department_id`,
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
      RETURNING id, first_name, last_name, email, company_id, role_id, department_id`,
    [hashedPassword, departmentId, roleId, status, id]
  );

  return updatedUser[0];
};

/**
 * update a user by user him/her self
 * @param {object} userInfo
 * @returns object || undefined
 */
const updateSelf = async (userInfo) => {
  const { id, firstName, lastName, password } = userInfo;

  let hashedPassword;
  // use the default salt as 10
  if (password) hashedPassword = bcrypt.hashSync(password);

  const user = await db.query(
    `
      UPDATE users
      SET 
          first_name = COALESCE($1, first_name), 
          last_name = COALESCE($2, last_name), 
          password = COALESCE($3, password)
      WHERE id = $4
      RETURNING id, first_name, last_name, email, company_id, role_id, department_id`,
    [firstName, lastName, hashedPassword, id]
  );

  return user[0];
};

module.exports = {
  list,
  getById,
  create,
  updateSelf,
  update,
};
