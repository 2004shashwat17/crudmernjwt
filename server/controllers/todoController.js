const Todo = require('../models/Todo');

const getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
};

const addTodo = async (req, res) => {
  const newTodo = new Todo({ text: req.body.text });
  const saved = await newTodo.save();
  res.status(201).json(saved);
};

const updateTodo = async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text },
    { new: true }
  );
  res.status(200).json(updated);
};

const deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Todo deleted successfully' });
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo
};
