const db = require("../../db");

/**
 * get an issue by id with comments
 * @param {number} id
 * @returns object
 */
const getById = async (id) => {
  const issue = await db.query(
    `
    SELECT *
    FROM issues
    WHERE id = $1
   `,
    [id]
  );

  const comments = await db.query(
    `
    SELECT *
    FROM comments
    WHERE issue_id = $1
   `,
    [id]
  );

  return {
    issue: issue[0],
    comments,
  };
};

/**
 * list all the issues that an user received
 * @param {number} receiverId
 * @returns array
 */
const listReceived = async (receiverId) => {
  const issues = await db.query(
    `
   SELECT *
   FROM issues
   WHERE receiver = $1
  `,
    [receiverId]
  );

  return issues;
};

/**
 * list all the issues that an user issued
 * @param {number} issuerId
 * @returns array
 */
const listIssued = async (issuerId) => {
  const issues = await db.query(
    `
   SELECT *
   FROM issues
   WHERE issuer = $1
  `,
    [issuerId]
  );

  return issues;
};

/**
 * list all the issues by department id
 * @param {number} departmentId
 */
const listByDepartment = async (departmentId) => {
  const issues = await db.query(
    `
    SELECT
        i.title,
        i.issuer,
        i.receiver,
        i.due_at,
        i.updated_at,
        i.created_at,
        i.status
    FROM users u
    RIGHT JOIN issues i ON i.issuer = u.id OR i.receiver = u.id
    WHERE u.department_id = $1
  `,
    [departmentId]
  );

  return issues;
};

/**
 *
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
 * update a issue by id
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
  getById,
  listReceived,
  listIssued,
  listByDepartment,
  create,
  update,
};
