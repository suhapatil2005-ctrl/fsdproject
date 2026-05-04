const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

/* ================= AUTH ================= */

// Register
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const sql = "INSERT INTO users (name,email,password) VALUES (?,?,?)";
  db.query(sql, [name, email, password], (err, result) => {
    if (err) return res.send(err);
    res.send("User Registered");
  });
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=? AND password=?";
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.send(err);

    if (result.length > 0) {
      res.json({ status: "success", user: result[0] });
    } else {
      res.json({ status: "fail" });
    }
  });
});

/* ================= DOUBTS ================= */

// Add doubt
app.post("/add-doubt", (req, res) => {
  const { question } = req.body;

  db.query("INSERT INTO doubts (question) VALUES (?)",
    [question],
    (err) => {
      if (err) throw err;
      res.send("Doubt added");
    });
});

// Get doubts
app.get("/doubts", (req, res) => {
  db.query("SELECT * FROM doubts", (err, result) => {
    res.json(result);
  });
});

/* ================= NOTES ================= */

app.post("/add-note", (req, res) => {
  const { title } = req.body;

  db.query("INSERT INTO notes (title) VALUES (?)",
    [title],
    (err) => {
      if (err) throw err;
      res.send("Note added");
    });
});

app.get("/notes", (req, res) => {
  db.query("SELECT * FROM notes", (err, result) => {
    res.json(result);
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});