const todoModel = require('../models/todoModel.js')

module.exports.listTodos = (req, res) => {
    const todos = todoModel.list()
    res.send(todos)
}

module.exports.findTodo = (req, res) => {
    const id = req.params.id
    const todo = todoModel.find(Number(id))
    if (!todo) {
        res.status(404).send('ID Not Found')
    } else {
        res.send(todo)
    }
}

module.exports.createTodo = (req, res) => {
    const task = req.body.task
    if (!task) {
        res.status(400).send('Invalid')
    } else {
        const newTask = todoModel.create(task)
        res.status(201).send(newTask)
    }
}

module.exports.updateTodo = (req, res) => {
    const done = req.body.isDone
    const id = req.params.id
    const todo = todoModel.update(Number(id), done)
    if (!todo) {
        res.status(404).send({ message: 'ID Not Found' });
        return;
    }
    res.status(201).send(todo);
}

module.exports.deleteTodo = (req, res) => {
    const id = req.params.id
    const todo = todoModel.destroy(Number(id));
    if (!todo) {
        res.status(404).send('ID Not Found')
    } else {
        res.sendStatus(204)
    }
}