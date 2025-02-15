import $prisma from "../lib/prisma";

async function createUser(input: { email: string; pwd: string }) {
  return $prisma.user.create({
    data: {
      email: input.email,
      password: input.pwd,
    },
  });
}

async function getUserByEmail(email: string) {
  return $prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async function getUserById(id: string) {
  return $prisma.user.findUnique({
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
