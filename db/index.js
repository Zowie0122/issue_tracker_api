const { Pool } = require("pg");
const DB_CONFIG = require("./config")

const pool = new Pool(DB_CONFIG);

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
