require("dotenv").config();
const { Pool } = require("pg");
const { DBError } = require("../src/utils/errors");

const DB_CONFIG = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PW,
  port: process.env.DB_INTERNAL_HTTP_PORT,
};

const pool = new Pool(DB_CONFIG);

module.exports = {
  query: (text, params) => {
    return pool
      .query(text, params)
      .then((res) => res.rows)
      .catch((err) => {
        throw new DBError(err);
      });
  },
};
