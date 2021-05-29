const manageTask = require('../lib/v1/manageTask');

exports.post = (req, res, next) => {
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

exports.get = async (req, res, next) => {
  const data = await manageTask.listTasks();
  console.log('ENTROU LIST', data);

  res.status(200).send(data);
};

exports.getById = async (req, res, next) => {
  let id = req.params.id;

  const data = await manageTask.detailTask(id);

  res.status(200).send(data);
};
