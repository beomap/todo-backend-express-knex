## The Todos App

### Codebase Analysis

- We have a simple Node.js backend built with Express and Knex, connected to a PostgreSQL database.
- There’s a set of basic CRUD operations around a single todos table.
- Tests are set up using Jest to verify CRUD functionality.
- Frontend: skip as we only update the backend in this assignment

- Missing setup

  - No typescript
  - A proper ORM lib

- Missing features
  - Authentication/Authorization: Currently, there is no login system or user roles.
  - Group todos by Org and Project
  - Assigning/Unassigning todos
  - Comment on a todo
  - Notifications

### Implementation plan

- Setup typescript and ORM
- Restructure the server
- Feature being implemented

  - Authentication/Authorization
  - Group todos by Org and Project
  - Assign/Unassign a todos
  - Comment on a todo

- ERD design

```
Table "Users" {
  "id" text [pk]
  "email" text [unique]
  "password" text [note: "hased pwd"]
  "created_at" timestamptz [default: "now()"]
  "updated_at" timestamptz [default: "now()"]
}

Table "Orgs" {
  "id" text [pk]
  "name" text
  "created_at" timestamptz [default: "now()"]
  "updated_at" timestamptz [default: "now()"]
}


Enum "UserOrgRole" {
  OWNER
  ADMIN
  MEMBER
}

Table "OrgMembers" {
  "id" text [pk]
  "created_at" timestamptz [default: "now()"]
  "updated_at" timestamptz [default: "now()"]
  "org_id" text [ref:> Orgs.id]
  "user_id" text [ref:>Users.id]
  "role" UserOrgRole
}

Table "Projects" {
  "id" text [pk]
  "name" text
  "description" text
  "org_id" text [ref:>Orgs.id]
  "created_at" timestamptz [default: "now()"]
  "updated_at" timestamptz [default: "now()"]
}

Enum TodoStatus {
  TODO // starter
  IN_PROGRESS
  IN_REVIEW
  DONE
  CANCELLED
}

Table "Todos" {
  "id" text [pk]
  "title" text
  "description" text
  "status" TodoStatus
  "project_id" text [ref:>Projects.id]
  "created_at" timestamptz [default: "now()"]
  "updated_at" timestamptz [default: "now()"]
}

Table "TodoAssignees" {
 "id" text [pk]
  "todo_id" text [ref:>Todos.id]
  "user_id" text [ref:>Users.id]
  "created_at" timestamptz [default: "now()"]
  "updated_at" timestamptz [default: "now()"]
}

Table "Comments" {
  "id" text [pk]
  "message" text
  "todo_id" text [ref:>Todos.id]
  "user_id" text [ref:>Users.id]
  "created_at" timestamptz [default: "now()"]
  "updated_at" timestamptz [default: "now()"]
}

```

- API design

```markdown
Base URL: api/v1

#### Authentication

- POST `/auth/register` - Register a new user
- POST `/auth/login` - Login the user

- POST `/auth/logout` - Logout the user
- POST `/auth/me` - Logout the user

#### Orgs

- POST `/orgs` - Create new organization
- GET `/orgs` - Get list of user's organization, support filter by name, pagination
- GET `orgs/:id` - Get orgs details (members count, projects count)
- PUT `orgs/:id` - Update the orgs details
- GET `orgs/:id/members` - Get orgs members with pagination
- POST `orgs/:id/members` - Add an user to the orgs, only admin can do this
- POST `orgs/:id/members/:userId` - remove an user from the orgs, only admin can do this
- PATH `orgs/:id/members/:userId/role` - update role for the member

#### Projects

- POST `orgs/:id/projects` - Create a new project
- GET `orgs/:id/projects` - List of org's project, support pagination
- GET `/projects/:id` - Get project details
- PUT `/projects/:id` - Update project details
- DELETE `/projects/:id` - Delete a project

#### Todos

- POST `/projects/:id/todos` - Create a todo in a project
- GET `/projects/:id/todos` - Get list of todos, support pagination, filter by status, assigned user
- GET `/todos/:id` - Get details of the todo
- PUT `/todos/:id` - Update details of the todo
- POST `/todos/:id/assignees` - Assign user to a todo
- DELETE `/todos/:id/assignees/:userId` - UnAssign user to a todo
- POST `/todos/:id/comments` - Add comment to a todo
- GET `/todos/:id/comments` - Add comment to a todo

#### Comments

- PUT `/comments/:id` update the comment, only the author can edit
- DELETE `/comments/:id` remove the comment, only the author can remove
```

- Code implementation
