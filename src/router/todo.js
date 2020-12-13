const express = require('express');
const router = express.Router();
const {validateTodo} = require('../middleware/bodyValidator');
const todoController = require('../controller/todoController');

router.get('/', todoController.getTodoList);
router.get('/:todoId', todoController.getTodo);
router.post('/', validateTodo, todoController.createTodo);
router.put('/:todoId', todoController.updateTodo);
router.delete('/:todoId', todoController.deleteTodo);

router.use(todoController.errorHandler);

module.exports = router;