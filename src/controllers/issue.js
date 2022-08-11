const db = require("../../db");
const comment = require("./comment")
const { ForbiddenError } = require("../utils/errors");

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
    WITH cte AS (
      SELECT
        i.id,
        i.title,
        i.description,
        i.issuer                                    AS issuer_id,
        CONCAT (ui.first_name, ' ', ui.last_name)   AS "issuer_name",
        i.receiver AS receiver_id,
        CONCAT (ur.first_name, ' ', ur.last_name)   AS "receiver_name",
        ui.department_id                            AS issuer_department_id,
        ur.department_id                            AS receiver_department_id,
        ui.company_id,
        i.due_at,
        i.updated_at,
        i.created_at,
        i.status
        FROM issues i
        LEFT JOIN users ui ON ui.id = i.issuer
        LEFT JOIN users ur ON ur.id = i.receiver
    )
    SELECT *
    FROM cte c
    WHERE c.id = COALESCE($1, c.id) AND c.issuer_id = COALESCE($2, c.issuer_id) AND c.receiver_id = COALESCE($3, c.receiver_id) AND c.company_id = $4
    ORDER BY c.updated_at DESC
    LIMIT $5 OFFSET $6
    `,
    [id, issuer, receiver, companyId, limit, (page - 1) * limit]
  );

  for (const issue of issues) {
    issue.comments = await comment.list(issue.id)
  }

  // Node-postgres driver interpret 64-bit as string
  // https://stackoverflow.com/questions/39168501/pg-promise-returns-integers-as-strings
  issues.forEach(issue => issue.id = Number(issue.id))

  return issues;
};

/**
 * add an issue
 * @param {object} issueInfo
 * @returns object || undefined
 */
const create = async (issueInfo) => {
  const { title, description, issuer, receiver, dueAt } = issueInfo;

  if (issuer === receiver) throw new ForbiddenError()

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
