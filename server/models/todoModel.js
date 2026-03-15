let id = 1;
const getId = () => id++;

const todos = [
    { id: getId(), task: 'Buy groceries', isDone: false },
    { id: getId(), task: 'Walk the dog', isDone: true },
    { id: getId(), task: 'Read a book', isDone: false },
];

module.exports.list = () => {
    return [...todos]
}

module.exports.find = (id) => {
    const todo = todos.find(todo => todo.id === id)
    if (!todo) {
        return null;
    } else {
        return { ...todo }
    }
}

module.exports.create = (task) => {
    const newTask = { id: getId(), task, isDone: false }
    todos.push(newTask)
    return { ...newTask }
}

module.exports.update = (id, changes) => {
    const todo = todos.find(todo => todo.id === id)
    if (!todo) {
        return null;
    } else {
        todo.isDone = changes
        return { ...todo }
    }
}

module.exports.destroy = (id) => {
    const index = todos.findIndex(todo => todo.id === id)
    if (index < 0) {
        return false;
    } else {
        todos.splice(index, 1)
        return true;
    }
}
