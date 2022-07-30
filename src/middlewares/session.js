const session = require('express-session')
require("dotenv").config();

const EXPIRE_HOUR = 3600000

const sessionHandler = session({
    secret: process.env.SESSION_SECRET,
    name: "issue_tracker_sid",
    saveUninitialized: false,
    resave: false,
    proxy:true,
    cookie: {
        expires: new Date(Date.now() + EXPIRE_HOUR),
        httpOnly: true
    },
})

module.exports = sessionHandler
