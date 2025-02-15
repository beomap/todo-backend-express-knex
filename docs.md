## About my self

- Hieu Vu - HCMC, Vietnam
- Software Engineer with 8 years of experience working as backend and frontend engineer

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
- API design

```markdown
Base URL: api/v1

#### Authentication

- POST `/auth/register` - Register a new user
- POST `/auth/login` - Login the user

- POST `/auth/logout` - Logout the user //

#### Orgs

- POST `/orgs` - Create new organization
- GET `/orgs` - Get list of user's organization, support filter by name, pagination
- GET `orgs/:id` - Get orgs details (members count, projects count) // WILL NOT IMPLEMENT
- PUT `orgs/:id` - Update the orgs details
- GET `orgs/:id/members` - Get orgs members with pagination
- POST `orgs/:id/members` - Add an user to the orgs, only admin can do this
- POST `orgs/:id/members/:userId` - remove an user from the orgs, only admin can do this
- PATH `orgs/:id/members/:userId/role` - update role for the member

#### Projects

- POST `orgs/:id/projects` - Create a new project
- GET `orgs/:id/projects` - List of org's project, support pagination
- GET `/projects/:id` - Get project details // WILL NOT IMPLEMENT
- PUT `/projects/:id` - Update project details
- DELETE `/projects/:id` - Delete a project

#### Todos

- POST `/projects/:id/todos` - Create a todo in a project
- GET `/projects/:id/todos` - Get list of todos, support pagination, filter by status, assigned user
- GET `/todos/:id` - Get details of the todo // WILL NOT IMPLEMENT
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
