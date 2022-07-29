const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.API_INTERNAL_HTTP_PORT;
const db = require("./db")

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
