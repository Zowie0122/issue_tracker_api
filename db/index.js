const { Pool } = require("pg");
const DB_CONFIG = require("./config");
const { DBError } = require("../src/utils/errors");

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
