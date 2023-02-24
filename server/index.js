const express = require("express");
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USERNAME,
  password: process.env.DB_USERNAME,
  port: 3307,
  database: "tasks",
});

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/tasks", (req, res) => {
  const q = "select * from todotasks";
  db.query(q, (err, data) => {
    console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  });
});
app.post("/tasks", (req, res) => {
  console.log("db=========", db);
  const q = `insert into todotasks(taskName)
      values(?)`;
  const values = [...Object.values(req.body)];
  console.log("insert", values);
  db.query(q, [values], (err, data) => {
    console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  });
});

app.get("/tasks/:taskId", (req, res) => {
  const id = req.params.taskId;
  const q = "SELECT * FROM todotasks where taskID=?";
  db.query(q, [id], (err, data) => {
    console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  });
});

app.put("/tasks/:taskId", (req, res) => {
  const id = req.params.taskId;
  console.log("updated " + req.body);
  const data = req.body;
  const q =
    "UPDATE todotasks SET " +
    Object.keys(data)
      .map((k) => `${k} = ?`)
      .join(",") +
    " WHERE taskId=" +
    id +
    "";
  db.query(q, [...Object.values(data)], (err, out) => {
    console.log(err, out);
    if (err) return res.json({ error: err.message });
    else {
      return res.json({ data: out });
    }
  });
});

app.delete("/tasks/:taskID", (req, res) => {
  const id = req.params.taskID;
  console.log("deleting " + id, req.body);
  console.log(req.body);
  const q = `DELETE FROM todotasks WHERE taskID= ?`;
  db.query(q, [id], (err, data) => {
    console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else res.json({ data });
  });
});

app.listen(8081, () => {
  console.log("listening");
});
