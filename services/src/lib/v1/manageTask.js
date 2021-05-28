const Connection = require('../../database/Connection');

function addTask(task) {
  console.log('ENTROU ADD', task);
  const connection = new Connection();

  return connection.insertTask(task);
}

function editTask(task) {
  const connection = new Connection();

  return connection.updateTask(task);
}

function removeTask(id) {
  const connection = new Connection();

  return connection.updateTask(id);
}

function detailTask(task) {
  const connection = new Connection();

  return connection.getTask(task);
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