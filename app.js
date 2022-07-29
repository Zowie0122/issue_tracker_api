require("dotenv").config();
const express = require("express");
const db = require("./db")

const user = require("./src/routes/user")
const admin = require("./src/routes/admin")
const issue = require("./src/routes/issue")
const comment = require("./src/routes/comment")
const department = require("./src/routes/department")

const PORT = process.env.API_INTERNAL_HTTP_PORT;
const app = express();

app.use("/user", [], user);
app.use("/admin", [], admin);
app.use("/issue", [], issue);
app.use("/comment", [], comment);
app.use("/department", [], department);

// test for now
app.get('/', (req, res, next) => {
  db.query('SELECT * FROM users', [], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows[0])
  })
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
