const db = require("../../db");

/**
 * get company id by user id
 * @param {string} id
 * @returns number || undefined
 */
const getCompanyIdByUserId = async (id) => {
  const result = await db.query(
    `
    SELECT company_id FROM users
    WHERE id = $1
    `,
    [id]
  );

  return result[0]?.company_id;
};

/**
 * get company id by user email
 * @param {string} email
 * @returns number || undefined
 */
const getCompanyIdByUserEmail = async (email) => {
  const result = await db.query(
    `
   SELECT company_id FROM users
   WHERE email = $1
   `,
    [email]
  );

  return result[0]?.company_id;
};

module.exports = { getCompanyIdByUserId, getCompanyIdByUserEmail };
