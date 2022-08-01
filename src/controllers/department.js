const db = require("../../db");

/**
 * list all the departments by company id
 * @param {number} companyId
 * @returns array
 */
const list = async (companyId) => {
  const departments = await db.query(
    `
    SELECT * 
    FROM departments
    WHERE company_id = $1
    `,
    [companyId]
  );

  return departments;
};

/**
 * get department id by user id
 * @param {string} id
 * @returns number || undefined
 */
const getDepartmentIdByUserId = async (userId) => {
  const result = await db.query(
    `
    SELECT department_id 
    FROM users
    WHERE id = $1
    `,
    [userId]
  );

  return result[0]?.department_id;
};

/**
 * add a new department, only by admin
 * @param {object} departmentInfo
 * @returns object
 */
const create = async (departmentInfo) => {
  const { name, companyId } = departmentInfo;

  const newDepartment = await db.query(
    `
    INSERT INTO departments (
        name,
        company_id
    )
    VALUES ($1,$2)
    RETURNING *`,
    [name, companyId]
  );
  return newDepartment[0];
};

module.exports = { list, getDepartmentIdByUserId, create };
