const ERRS = require("../utils/errors");

/**
 * list all the users
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const list = (req, res, next) => {};

/**
 * get user by id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getByID = (req, res, next) => {};

/**
 * create an user, only by admin
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const create = (req, res, next) => {};

/**
 * update a user by user himself/herself
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const updateSelf = (req, res, next) => {};

/**
 * update a user by admin
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
 const update = (req, res, next) => {};

module.exports = {
  list,
  getByID,
  create,
  updateSelf,
  update
};
