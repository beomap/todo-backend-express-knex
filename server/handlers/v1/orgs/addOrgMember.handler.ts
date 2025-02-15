import { Request, Response } from "express";
import { z } from "zod";
import { OrgRepo } from "../../../repo/org.repo";
import $prisma from "../../../lib/prisma";
import { UserOrgRole } from "@prisma/client";

const input = z.object({
  user_id: z.string(),
  role: z.enum(["ADMIN", "MEMBER"]),
});

export async function addOrgMemberOrgHandler(req: Request, res: Response) {
  try {
    const orgMem = await OrgRepo.getOrgMember(
      $prisma,
      req.params.id,
      // @ts-ignore
      req.user.id,
    );

    if (!orgMem) {
      res.status(404).json({
        message: "Org not found",
      });
      return;
    }

    if (
      orgMem.role !== UserOrgRole.OWNER &&
      orgMem.role !== UserOrgRole.ADMIN
    ) {
      res.status(403).json({
        message: "Permission denied",
      });
      return;
    }

    const data = input.parse(req.body);

    const mem = await OrgRepo.upsertOrgMember(
      $prisma,
      orgMem.orgId,
      data.user_id,
      data.role as UserOrgRole,
    );
    res.status(200).json({
      data: mem,
    });
  } catch (err: any) {
    console.log(`>>>err`, err);
    res.status(500).json(err);
  }
}
