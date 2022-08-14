const session = require("express-session")
pgSession = require('connect-pg-simple')(session);

const { SESSION_EXPIRE_HOUR } = require("../utils/constants");
const { pool } = require("../../db")

require("dotenv").config();


const sessionHandler = session({
  store: new pgSession({
    pool,
    tableName: 'session'
  }),

  secret: process.env.SESSION_SECRET,
  name: "issue_tracker_sid",
  saveUninitialized: false,
  resave: false,
  proxy: true,
  maxAge: 7200000 * 10,
  cookie: {
    // expires: new Date(Date.now() + SESSION_EXPIRE_HOUR),
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
});

module.exports = sessionHandler;
