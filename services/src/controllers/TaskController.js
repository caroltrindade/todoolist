const manageTask = require('../lib/v1/manageTask');

exports.post = (req, res, next) => {
  console.log('req', req.body);
  manageTask.addTask(req.body);

  res.status(200).send(`Success! Created Task`);
};

exports.put = (req, res, next) => {
  let id = req.params.id;

  manageTask.editTask(req.body);

  res.status(200).send(`Success! Updated Task with ID ${id}`);
};

exports.delete = (req, res, next) => {
  let id = req.params.id;

  manageTask.removeTask(req.body);

  res.status(200).send(`Success! Removed Task with ID ${id}`);
};

exports.get = (req, res, next) => {
  const data = manageTask.listTasks();

  res.status(200).send(data);
};

exports.getById = (req, res, next) => {
  let id = req.params.id;

  const data = manageTask.detailTask();

  res.status(200).send(data);
};
