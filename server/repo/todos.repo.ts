import { PrismaClient, TodoStatus } from "@prisma/client";
import { get } from "http";

async function create(
  $prisma: PrismaClient,
  input: {
    project_id: string;
    title: string;
    description: string;
  },
) {
  const todo = await $prisma.todo.create({
    data: {
      projectId: input.project_id,
      title: input.title,
      description: input.description,
      status: TodoStatus.TODO,
    },
  });

  return todo;
}

async function updateById(
  $prisma: PrismaClient,
  data: {
    id: string;
    status: TodoStatus;
    title: string;
    description: string;
  },
) {
  return await $prisma.todo.update({
    where: {
      id: data.id,
    },
    data: {
      status: data.status,
      title: data.title,
      description: data.description,
    },
  });
}

async function assginUser(
  $prisma: PrismaClient,
  data: { id: string; todoId: string; userId: string },
) {
  return await $prisma.todoAssignee.upsert({
    where: {
      todoId_userId: {
        todoId: data.id,
        userId: data.userId,
      },
    },
    create: {
      userId: data.userId,
      todoId: data.id,
    },
    update: {},
  });
}

async function getByProjectId(
  $prisma: PrismaClient,
  filter: {
    projectId: string;
    status: TodoStatus;
  },
  pagination: { skip: number; take: number },
) {
  const tasks = await $prisma.todo.findMany({
    where: {
      projectId: filter.projectId,
      status: filter.status,
    },
    skip: pagination.skip,
    take: pagination.take,
  });

  const count = await $prisma.todo.count({
    where: {
      projectId: filter.projectId,
      status: filter.status,
    },
  });

  return {
    tasks,
    count,
  };
}

export const TodoRepo = {
  create,
  updateById,
  assginUser,
};
