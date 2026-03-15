# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use exact terms and concepts from the lesson.

Your responses will each be evaluated out of 3 points for writing quality and 3 points for technical accuracy (6 points per question, 30 points total).

---

## Question 1 — REST Principles

The Todo Tracker API is a **RESTful** API. Identify at least **3 specific design decisions** in the API that make it RESTful, and explain what each one communicates to a client developer. Consider the URL structure, HTTP methods, and status codes used.

**Your answer here**:

1. The endpoint URL's for the API describe the resource instead of the action that the endpoint is doing. `"/api/todos"` instead of `"api/getTodos"`.

2. The API uses different **HTTP Methods** to perform different actions on the same endpoint. `app.get("api/todos")` to retrieve the todos and `app.post("api/todos")` to create a new todo.

3. The API responses also use proper status codes. `404` for not found, `400` for an invalid request, `201` for a new resource being created, and `200` for a successful request

## Question 2 — Separation of Concerns

What problem is caused by mixing data logic and request/response logic in a single file? What does separating them into a model and controller enable? Be specific about what gets harder and what gets easier.

**Your answer here**:

Mixing data and request/response logic in a single file tightly couples concerns that should be independent, making it difficult to test the data alone since they're always entangled with HTTP-specific code. At scale, these files get harder to read, and any shared logic must be duplicated instead of reused. Separating into a model and controller means data can be tested, reused, and modified without touching request/response handling. The tradeoff is that tracing the data flow now needs navigating multiple files.

## Question 3 — Request Lifecycle

Walk through what happens, step by step, when the user clicks a checkbox to toggle a todo's `isDone` field. Name each file and function in your MVC structure that gets involved, in the order it runs, and describe what it does.

**Your answer here**:

1. `main.js` → `handleTodosListClick`: The user clicks the checkbox, this function fires, grabs the todo's `id` and the new `isDone` value, then calls `updateTodo` from `fetch-helpers.js`.

2. `fetch-helpers.js` → `updateTodo`: Sends a PATCH request to `/api/todos/:id` with the new `isDone` value in the request body.

3. `index.js` → `app.patch("/api/todos/:id")`: The server catches the request and routes it to `todoControllers.updateTodo`.

4. `todoControllers.js` → `updateTodo`: Pulls the `id` from the URL params and `isDone` from the request body, then passes them into `todoModel.update` and waits for the result.

5. `todoModel.js` → `update`: Finds the matching `todo` by `id`, sets its `isDone` to the new value, and returns the updated todo back up the chain to the controller, which sends it as the response.

## Question 4 — Code Sorting

Below is a `createTodo` function that does everything in one place. For each numbered line, identify whether it belongs in the **model** or the **controller**, and explain why.

```js
const createTodo = (req, res) => {
  /* 1 */ const { task } = req.body;
  /* 2 */ if (!task) return res.status(400).send({ message: 'task is required' });
  /* 3 */ const newTodo = { id: getId(), task, isDone: false };
  /* 4 */ todos.push(newTodo);
  /* 5 */ res.status(201).send(newTodo);
};
```

**Your answer here**:

1. **Controller** — `req.body` is part of the HTTP request, so pulling data out of it is request-handling work, which belongs in the controller.

2. **Controller** — this is validating the incoming request and sending back an HTTP error response using `res.status` and `res.send`, which are both response methods that only make sense in the controller.

3. **Model** — building the actual todo object is data logic. Deciding what shape the data takes and generating an `id`.

4. **Model** — the `todos` array lives in the model, so pushing to it is data logic and belongs there.

5. **Controller** — `res.status(201).send(newTodo)` is sending an HTTP response back to the client, which is request/response handling and belongs in the controller.
