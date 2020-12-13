const express = require('express');
const Todo = require('../model/Todo');
const router = express.Router();
const {isAuthenticated} = require('../middleware/auth');
const _ = require('lodash');

router.get('/', isAuthenticated, async (req, res) => {
    const  user = req.user;
    const todoList = await Todo.find({author : user.id});
    res.send(todoList);
});

router.get('/:todoId', async (req, res) => {
    const {todoId} = req.params;
    const user = req.user;
    const todo = await Todo.findById(todoId).populate('author');
    console.log(todo);
    if(!_.isEqual(todo.author.id, user.id)){
        res.status(401).send('Unauthorized transaction');
    }
    return res.send(todo.toJSON());
});

router.post('/create', isAuthenticated, async (req, res) => {
    const user = req.user;
    const {title, body, endDate} = req.body;
    try {
        const stubTodo = new Todo({
            title,
            body,
            author: user.id,
            createdAt: new Date(),
            endDate
        });
        await stubTodo.save();
        res.send(stubTodo.toJSON());
    } catch (err) {
        console.error(err);
        throw ('Todo not created');
    }
});

router.put('/:todoId', isAuthenticated, async (req, res) => {
    throw ('not implemented');
});

router.delete('/:todoId', isAuthenticated, async (req, res) => {
    throw ('not implemented');
});

router.use((err, req, res, next) => {
    res.status(500).send(err);
});

module.exports = router;