import { PrismaClient } from "@prisma/client";

async function createUser(
  prisma: PrismaClient,
  input: { email: string; pwd: string },
) {
  return prisma.user.create({
    data: {
      email: input.email,
      password: input.pwd,
    },
  });
}

async function getUserByEmail(prisma: PrismaClient, email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async function getUserById(prisma: PrismaClient, id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export const UserRepo = {
  createUser,
  getUserByEmail,
  getUserById,
};
