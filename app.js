require("dotenv").config();
const express = require("express");
const db = require("./db")

const PORT = process.env.API_INTERNAL_HTTP_PORT;
const app = express();

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
