require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sessionHandler = require("./src/middlewares/session");
const db = require("./db");

const session = require("express-session");
const DB_CONFIG = require("./db/config");

const EXPIRE_HOUR = 3600000;

const login = require("./src/routes/login");
const logout = require("./src/routes/logout");
const user = require("./src/routes/user");
const admin = require("./src/routes/admin");
const issue = require("./src/routes/issue");
const comment = require("./src/routes/comment");
const department = require("./src/routes/department");

const adminAuth = require("./src/middlewares/adminAuth");
const userAuth = require("./src/middlewares/userAuth");

const PORT = process.env.API_INTERNAL_HTTP_PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(sessionHandler);

app.use("/login", [], login);
app.use("/logout", [userAuth], logout);
app.use("/user", [userAuth], user);
app.use("/admin", [adminAuth], admin);
app.use("/issue", [userAuth], issue);
app.use("/comment", [userAuth], comment);
app.use("/department", [userAuth], department);

// test for now
app.get("/", (req, res, next) => {
  console.log("the req session when login", req.session);
  console.log("the req session user when login", req.session.user.email);
  db.query("SELECT * FROM users", [], (err, result) => {
    if (err) {
      return next(err);
    }
    res.send(result.rows[0]);
  });
});

app.listen(PORT, () => {
  console.log(`Issue Tracker API is listening on port ${PORT}`);
});
