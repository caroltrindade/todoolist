const cors = require('cors');
const TaskController = require('../Controllers/TaskController');

module.exports = (app) => {
   app.post('/task', TaskController.post);
   app.put('/task/:id', TaskController.put);
   app.delete('/task/:id', TaskController.delete);
   app.get('/tasks', TaskController.get);
   app.get('/task/:id', TaskController.getById);
}
