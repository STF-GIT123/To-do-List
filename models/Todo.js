const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
});

module.exports = mongoose.model("Todo", todoSchema);