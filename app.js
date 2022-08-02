require("dotenv").config();
const express = require("express");
const cors = require("cors");

// routes
const login = require("./src/routes/login");
const logout = require("./src/routes/logout");
const user = require("./src/routes/user");
const admin = require("./src/routes/admin");
const issue = require("./src/routes/issue");
const comment = require("./src/routes/comment");
const department = require("./src/routes/department");

// middlewares
const sessionHandler = require("./src/middlewares/session");
const adminAuth = require("./src/middlewares/adminAuth");
const userAuth = require("./src/middlewares/userAuth");
const errorHandler = require("./src/middlewares/errorHandler");

const { NotFoundError } = require("./src/utils/errors");

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
app.use("/users", [userAuth], user);
app.use("/issues", [userAuth], issue);
app.use("/comments", [userAuth], comment);
app.use("/departments", [userAuth], department);
app.use("/admins", [adminAuth], admin);

// For the requests that no routes matched
app.all("*", (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Issue Tracker API is listening on port ${PORT}`);
});
