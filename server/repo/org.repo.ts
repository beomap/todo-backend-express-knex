import { PrismaClient, UserOrgRole } from "@prisma/client";

async function createOrg(prisma: PrismaClient, name: string) {
  return prisma.org.create({
    data: {
      name,
    },
  });
}

async function getById(prisma: PrismaClient, id: string) {
  return prisma.org.findUnique({
    where: {
      id,
    },
  });
}

async function upsertOrgMember(
  prisma: PrismaClient,
  orgId: string,
  userId: string,
  role: UserOrgRole,
) {
  return prisma.orgMember.upsert({
    where: {
      orgId_userId: {
        orgId,
        userId,
      },
    },
    create: {
      role,
      orgId,
      userId,
    },
    update: {
      role,
    },
  });
}

async function getOrgMembers(
  prisma: PrismaClient,
  filter: {
    orgId: string;
    role?: UserOrgRole;
    userId?: string;
  },
  pagination: {
    skip?: number;
    take?: number;
  },
) {
  const members = prisma.orgMember.findMany({
    where: {
      orgId: filter.orgId,
      role: filter.role,
      userId: filter.userId,
    },
    skip: pagination.skip,
    take: pagination.take,
  });

  const count = prisma.orgMember.count({
    where: {
      orgId: filter.orgId,
      role: filter.role,
      userId: filter.userId,
    },
  });

  return {
    members,
    count,
  };
}

async function deleteOrgsMemberByUserId(prisma: PrismaClient, userId: string) {
  return prisma.orgMember.deleteMany({
    where: {
      userId,
    },
  });
}

async function getOrgMember(
  prisma: PrismaClient,
  orgId: string,
  userId: string,
) {
  return prisma.orgMember.findUnique({
    where: {
      orgId_userId: {
        orgId,
        userId,
      },
    },
  });
}

export const OrgRepo = {
  createOrg,
  getById,
  upsertOrgMember,
  getOrgMembers,
  getOrgMember,
  deleteOrgsMemberByUserId,
};
