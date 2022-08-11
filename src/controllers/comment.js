const db = require("../../db");

/**
 * get comments by an issue id
 * @param {number} issueId
 * @returns array
 */
const list = async (issueId) => {
  const comments = await db.query(
    `
    WITH cte AS (
        SELECT *
        FROM comments
        WHERE issue_id = $1
        ORDER BY created_at DESC
    )
    SELECT
    c.*,
    CONCAT (u.first_name, ' ', u.last_name)   AS "issuer_name"
    FROM cte c
    LEFT JOIN users u ON c.issuer = u.id
    `
    ,
    [issueId]
  );

  return comments;
};

/**
 * add a comment to an issue
 * @param {object} commentInfo
 * @returns object
 */
const create = async (commentInfo) => {
  const { contents, issuer, receiver, issueId } = commentInfo;

  const newComment = await db.query(
    `
    INSERT INTO comments (
        contents,
        issue_id,
        issuer,
        receiver
    )
    VALUES ($1,$2,$3,$4)
    RETURNING *`,
    [contents, issueId, issuer, receiver]
  );
  return newComment[0];
};

module.exports = { list, create };
