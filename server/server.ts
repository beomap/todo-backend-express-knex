import app from "./server-config";

const port = process.env.PORT || 5555;

import { healthHandler } from "./handlers/health";
import { loginHandler, registerHandler } from "./handlers/v1/auth";

app.get("/api/v1/health", healthHandler);

// auth
app.post("/api/v1/auth/register", registerHandler);
app.post("/api/v1/auth/login", loginHandler);

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
