const Connection = require('../../database/Connection');

function addTask(task) {
  const connection = new Connection();

  return connection.insertTask(task);
}

function editTask(task) {
  const connection = new Connection();

  return connection.updateTask(task);
}

function removeTask(id) {
  const connection = new Connection();

  return connection.deleteTask(id);
}

function detailTask(id) {
  const connection = new Connection();

  return connection.getTask(id);
}

function listTasks() {
  const connection = new Connection();

  return connection.listTasks();
}

module.exports = {
  addTask,
  editTask,
  removeTask,
  detailTask,
  listTasks,
}