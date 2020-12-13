const Todo = require('../model/Todo');
const {validationResult} = require('express-validator');
const _ = require('lodash');

exports.createTodo = async function (req, res) {
    const user = req.user;
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const {title, body, endDate} = req.body;
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
};

exports.getTodo = async function(req, res) {
    const {todoId} = req.params;
    const user = req.user;
    const todo = await Todo.findById(todoId).populate('author');
    console.log(todo);
    if(!_.isEqual(todo.author.id, user.id)){
        res.status(401).send('Unauthorized transaction');
    }
    return res.send(todo.toJSON());
};

exports.getTodoList = async function(req, res) {
    const  user = req.user;
    const todoList = await Todo.find({author : user.id});
    res.send(todoList);
};

exports.updateTodo = async function(req, res) {
    throw ('not implemented');
}

exports.deleteTodo = async function(req, res) {
    throw ('not implemented');
}

exports.errorHandler = function(err, req, res, next) {
    res.status(500).send(err);
}