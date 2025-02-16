import app from "./server-config";

const port = process.env.PORT || 5555;

import { healthHandler } from "./handlers/health";
import { loginHandler, registerHandler } from "./handlers/v1/auth";
import { authGuard } from "./middleware/auth";
import { getMeHandler } from "./handlers/v1/auth/me.handler";
import { createOrgHandler } from "./handlers/v1/orgs/createOrg.handler";
import { addOrgMemberOrgHandler } from "./handlers/v1/orgs/addOrgMember.handler";
import { createProjectHandler } from "./handlers/v1/orgs/createProject.handler";
import { addProjectTodoHandler } from "./handlers/v1/projects/addProjectTodo.handler";

app.get("/api/v1/health", healthHandler);

// auth
app.post("/api/v1/auth/register", registerHandler);
app.post("/api/v1/auth/login", loginHandler);
app.get("/api/v1/auth/me", authGuard, getMeHandler);

// org
app.post("/api/v1/orgs", authGuard, createOrgHandler);
app.post("/api/v1/orgs/:id/members", authGuard, addOrgMemberOrgHandler);

app.post("/api/v1/orgs/:id/projects", authGuard, createProjectHandler);
app.post("/api/v1/projects/:id/todos", authGuard, addProjectTodoHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
