const db = require("../../db");

/**
 * get issue(s) with comments by queries
 * @param {object} queries
 * @returns array
 */
const list = async (queries) => {
  // support pagination
  const { id, issuer, receiver, companyId, limit, page } = queries;

  const issues = await db.query(
    `
    SELECT
        i.id,
        i.title,
        i.issuer,
        i.receiver,
        i.due_at,
        i.updated_at,
        i.created_at,
        i.status
    FROM issues i
    INNER JOIN users u ON u.id = i.issuer
    WHERE i.id = COALESCE($1, i.id) AND i.issuer = COALESCE($2, i.issuer) AND i.receiver = COALESCE($3, i.receiver) AND u.company_id = $4
    ORDER BY i.updated_at DESC
    LIMIT $5 OFFSET $6
    `,
    [id, issuer, receiver, companyId, limit, (page - 1) * limit]
  );

  for (const issue of issues) {
    issue.comments = await db.query(
      `
      SELECT *
      FROM comments
      WHERE issue_id = $1
      ORDER BY created_at DESC
     `,
      [issue.id]
    );
  }

  return issues;
};

/**
 * add an issue
 * @param {object} issueInfo
 * @returns object || undefined
 */
const create = async (issueInfo) => {
  const { title, description, issuer, receiver, dueAt } = issueInfo;

  const newIssue = await db.query(
    `
    INSERT INTO issues (
        title,
        description,
        issuer,
        receiver,
        due_at
    )
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *`,
    [title, description, issuer, receiver, dueAt]
  );
  return newIssue[0];
};

/**
 * update an issue by id
 * @param {number} issueId
 * @returns object || undefined
 */
const update = async (issueInfo) => {
  const { id, title, description, issuer, receiver, dueAt, status } = issueInfo;

  // TODO: switch to database trigger to auto generate the updatedAt instead of hard coding
  const updatedIssue = await db.query(
    `
    UPDATE issues
    SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        receiver = COALESCE($3, receiver),
        due_at = COALESCE($4, due_at),
        status = COALESCE($5, status),
        updated_at = $6
    WHERE issuer = $7 AND id = $8
    RETURNING *`,
    [title, description, receiver, dueAt, status, new Date(), issuer, id]
  );
  return updatedIssue[0];
};

module.exports = {
  list,
  create,
  update,
};
