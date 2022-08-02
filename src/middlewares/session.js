const session = require("express-session");
const { SESSION_EXPIRE_HOUR } = require("../utils/constants");

require("dotenv").config();

const sessionHandler = session({
  secret: process.env.SESSION_SECRET,
  name: "issue_tracker_sid",
  saveUninitialized: false,
  resave: false,
  proxy: true,
  cookie: {
    expires: new Date(Date.now() + SESSION_EXPIRE_HOUR),
    httpOnly: true,
  },
});

module.exports = sessionHandler;
