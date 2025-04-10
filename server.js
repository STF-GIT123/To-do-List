const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/todoApp");

app.post("/api/todos", async (req, res) => {
  const { title, description } = req.body;
  const todo = await Todo.create({ title, description, date: new Date() });
  res.json(todo);
});

app.get("/api/todos", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const todos = await Todo.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ date: -1 });
  res.json(todos);
});

app.get("/api/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.json(todo);
});

app.put("/api/todos/:id", async (req, res) => {
  const { title, description } = req.body;
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    { title, description },
    { new: true }
  );
  res.json(updated);
});

app.listen(4000, () => console.log("Server running on port 4000"));