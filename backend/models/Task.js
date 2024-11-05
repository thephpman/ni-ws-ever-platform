const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  project: { type: String, default: "General" },
});

module.exports = mongoose.model('Task', taskSchema);
