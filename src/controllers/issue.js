const ERRS = require("../utils/errors");

/**
 * list all the issues that a user received
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const listReceived = (req, res, next) => {};

/**
 * list all the issues that a user issued
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const listIssued = (req, res, next) => {};

/**
 * list all the issues by department id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const listByDepartment = (req, res, next) => {};

/**
 * list all the issues by company id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const listByCompany = (req, res, next) => {};

/**
 * update a issue by id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const update = (req, res, next) => {};

module.exports = {
  listReceived,
  listIssued,
  listByDepartment,
  listByCompany,
  update,
};
