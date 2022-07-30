const db = require("../../db");

/**
 * list all the issues that a user received
 * @param {number} toId
 */
const listReceived = (toId) => {};

/**
 * list all the issues that a user issued
 * @param {number} fromId
 */
const listIssued = (fromId) => {};

/**
 * list all the issues by department id
 * @param {number} departmentId
 */
const listByDepartment = (departmentId) => {};

/**
 * list all the issues by company id
 * @param {number} companyId
 */
const listByCompany = (companyId) => {};

/**
 * update a issue by id
 * @param {number} issueId
 */
const update = (issueId) => {};

module.exports = {
  listReceived,
  listIssued,
  listByDepartment,
  listByCompany,
  update,
};
