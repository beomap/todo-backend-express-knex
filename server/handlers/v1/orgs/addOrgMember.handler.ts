import { Request, Response } from "express";
import { z } from "zod";
import { OrgRepo } from "../../../repo/org.repo";
import $prisma from "../../../lib/prisma";
import { UserOrgRole } from "@prisma/client";

const input = z.object({
  userId: z.string(),
});

export async function addOrgMemberOrgHandler(req: Request, res: Response) {
  try {
    const data = input.parse(req.body);
    const org = await OrgRepo.getOrgMember(
      $prisma,
      req.params.id,
      // @ts-ignore
      req.user.id,
    );

    if (!org) {
      return res.status(404).json({
        message: "Org not found",
      });
    }

    const mem = await OrgRepo.upsertOrgMember(
      $prisma,
      org.id,
      data.userId,
      UserOrgRole.OWNER,
    );

    res.status(200).json({
      data: mem,
    });
  } catch (err: any) {
    res.status(500).json(err);
  }
}
