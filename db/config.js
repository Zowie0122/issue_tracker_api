require("dotenv").config();

const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PW,
    port: process.env.DB_INTERNAL_HTTP_PORT,
  }

module.exports = config
