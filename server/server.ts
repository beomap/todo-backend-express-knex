import app from "./server-config";

const port = process.env.PORT || 5555;

import { healthHandler } from "./handlers/health";

app.get("/api/v1/health", healthHandler);

// app.get("/", routes.getAllTodos);
// app.get("/:id", routes.getTodo);

// app.post("/", routes.postTodo);
// app.patch("/:id", routes.patchTodo);

// app.delete("/", routes.deleteAllTodos);
// app.delete("/:id", routes.deleteTodo);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
