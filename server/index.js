const todoControllers = require('./controllers/todoControllers.js')
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


const serve404 = (req, res, next) => {
  res.status(404).send({ error: `Not Found: ${req.originalUrl}` })
}

app.get('/api/todos', todoControllers.listTodos);
app.get('/api/todos/:id', todoControllers.findTodo);
app.post('/api/todos', todoControllers.createTodo);
app.patch('/api/todos/:id', todoControllers.updateTodo);
app.delete('/api/todos/:id', todoControllers.deleteTodo);
app.use(serve404)

const port = 8080;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
