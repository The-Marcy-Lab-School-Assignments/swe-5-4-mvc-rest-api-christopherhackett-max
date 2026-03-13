const express = require('express');
const path = require('path');

const app = express();
const pathToFrontend = path.join(__dirname, '../frontend');

////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

app.use(logRoutes);
app.use(express.static(pathToFrontend));
app.use(express.json());

////////////////////////
// In-Memory Database
////////////////////////


// Increments and returns a unique id each time it is called.
let id = 1;
const getId = () => id++;

// Seed data — do not remove
const todos = [
  { id: getId(), task: 'Buy groceries', isDone: false },
  { id: getId(), task: 'Walk the dog', isDone: true },
  { id: getId(), task: 'Read a book', isDone: false },
];

////////////////////////
// Endpoints
////////////////////////

// TODO: GET /api/todos
// Response: 200, array of all todos

const serveTodos = async (req, res, next) => {
  res.send(todos)
}


// TODO: GET /api/todos/:id
// Response: 200, single todo object
// Error: 404 if no todo with that id
const serveTodo = (req, res, next) => {
  const id = req.params.id
  const exists = todos.find(todo => todo.id === Number(id))
  if (!exists) {
    res.status(404).send('ID Not Found')
  } else {
    res.send(todos.find((todo) => todo.id === Number(id)))
  }
}

// TODO: POST /api/todos
// Request body: { task }
// Response: 201, the newly created todo object
// Error: 400 if task is missing from the request body

const makeTask = (req, res, next) => {
  const task = req.body.task
  if (!task) {
    res.status(400).send('Invalid')
  } else {
    const newTask = { id: getId(), task, isDone: false }
    todos.push(newTask)
    res.status(201).send(newTask)
  }
}


// TODO: PATCH /api/todos/:id
// Request body: { isDone }
// Response: 200, the updated todo object
// Error: 404 if no todo with that id

const updateTask = (req, res, next) => {
  const done = req.body.isDone
  const id = req.params.id
  const exists = todos.find(todo => todo.id === Number(id))
  if (!exists) {
    res.status(404).send('ID Not Found')
  } else {
    const todo = todos.find(todo => todo.id === Number(id))
    todo.isDone = done;
    res.send(todo)
  }
}

// TODO: DELETE /api/todos/:id
// Response: 204, no content
// Error: 404 if no todo with that id
const deleteTask = (req, res, next) => {
  const id = req.params.id
  const exists = todos.find(todo => todo.id === Number(id))
  if (!exists) {
    res.status(404).send('ID Not Found')
  } else {
    const task = todos.find(t => t.id === Number(id))
    todos.splice(task, 1)
    res.sendStatus(204)
  }
}

// TODO: Catch-all handler — send a 404 JSON error for unmatched /api routes,
// or serve index.html for all other routes (SPA fallback)

const serve404 = (req, res, next) => {
  res.status(404).send({ error: `Not Found: ${req.originalUrl}` })
}

app.get('/api/todos', serveTodos)
app.get('/api/todos/:id', serveTodo)
app.post('/api/todos', makeTask)
app.patch('/api/todos/:id', updateTask)
app.delete('/api/todos/:id', deleteTask)
app.use(serve404)

const port = 8080;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
