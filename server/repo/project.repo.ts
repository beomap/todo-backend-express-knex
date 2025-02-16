import { PrismaClient, UserOrgRole } from "@prisma/client";

async function create(
  prisma: PrismaClient,
  input: {
    orgId: string;
    name: string;
    description: string;
  },
) {
  return prisma.project.create({
    data: input,
  });
}

async function getById(prisma: PrismaClient, id: string) {
  return prisma.project.findUnique({
    where: {
      id,
    },
  });
}

async function updateById(
  prisma: PrismaClient,
  id: string,
  name: string,
  description: string,
) {
  return prisma.project.update({
    where: {
      id,
    },
    data: {
      name,
      description,
    },
  });
}

async function getByOrg(
  prisma: PrismaClient,
  orgId: string,
  pagination: {
    skip?: number;
    take?: number;
  },
) {
  return prisma.project.findMany({
    where: {
      orgId,
    },
    take: pagination.take,
    skip: pagination.skip,
  });
}

export const ProjectRepo = {
  create,
  getById,
  getByOrg,
  updateById,
};
