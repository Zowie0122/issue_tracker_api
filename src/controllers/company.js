const db = require("../../db");

/**
 * get company id by user id
 * @param {string} id
 * @returns number || undefined
 */
const getCompanyIdByUserId = async (userId) => {
  const result = await db.query(
    `
    SELECT company_id
    FROM users
    WHERE id = $1
    `,
    [userId]
  );

  return result[0]?.company_id;
};

module.exports = { getCompanyIdByUserId };
